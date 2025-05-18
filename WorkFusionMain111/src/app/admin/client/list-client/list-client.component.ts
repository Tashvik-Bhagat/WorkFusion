import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/client.model';  // Make sure to use the correct model
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: ClientModel[] = [];
  filteredClients: ClientModel[] = [];
  searchText: string = '';
  showDetails = false;
  selectedClient: ClientModel | null = null; // Initialize with null

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.adminService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.filteredClients = data;
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
  }

  showMore(client: ClientModel) {
    this.selectedClient = client;
    this.showDetails = true;
  }

  goToUpdateClient(clientId: number) {
    this.router.navigate(['admin/client/update-client', clientId]);  // Assuming the update route is correctly set
  }

  searchClient() {
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      this.filteredClients = this.clients.filter(client => {
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const email = client.email.toLowerCase();
        return fullName.includes(searchLower) || email.includes(searchLower);
      });
    } else {
      this.filteredClients = this.clients;
    }
  }

  resetSearch() {
    this.searchText = '';
    this.filteredClients = this.clients;
  }
}
