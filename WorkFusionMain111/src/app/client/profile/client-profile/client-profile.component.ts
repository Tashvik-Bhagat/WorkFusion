import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  clientId!: number;
  clientData: ClientModel | null = null;
  isLoading: boolean = true;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    const storedEntityId = localStorage.getItem('EntityId');
    if (storedEntityId) {
      this.clientId = +storedEntityId; // Convert to number
      this.fetchClientData();
    } else {
      console.error('EntityId not found in local storage.');
      this.isLoading = false;
    }
  }

  fetchClientData(): void {
    this.clientService.getClientById(this.clientId).subscribe({
      next: (data) => {
        this.clientData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
        this.isLoading = false;
      }
    });
  }

  navigateToUpdatePage(): void {
    this.router.navigate(['client/client-profile-update', this.clientId]);
  }
}
