import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service'; // Import the service
import { ClientsProjectRequestsModel } from '../../../models/clientProjectRequests.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-requests',
  templateUrl: './projects-requests.component.html',
  styleUrl: './projects-requests.component.css'
})
export class ProjectsRequestsComponent {
  projectRequests: ClientsProjectRequestsModel[] = [];
  filteredProjects: ClientsProjectRequestsModel[] = [];
  selectedProject: ClientsProjectRequestsModel | null = null;
  searchQuery: string = '';
  errorMessage: string | undefined;
  managerId: number | undefined;

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    this.getManagerIdFromLocalStorage();
    if (this.managerId) {
      this.fetchProjectRequests(this.managerId);
      console.log("fetched");
    } else {
      // Handle case where managerId is not found in localStorage
      this.errorMessage = 'ManagerId not found in localStorage. Please login again.';
      console.error('ManagerId not found in localStorage.');
      this.router.navigate(['/login']);  // Redirect to login if managerId is missing
    }
  }

  getManagerIdFromLocalStorage(): void {
    const storedManagerId = localStorage.getItem('EntityId');  // Fetch from localStorage
    if (storedManagerId) {
      this.managerId = parseInt(storedManagerId, 10);  // Convert the value to number
    } else {
      this.managerId = undefined; // Set undefined if not found
    }
  }

  fetchProjectRequests(managerId: number): void {
    this.managerService.getProjectRequestsManager(managerId).subscribe(
      (data) => {
        this.projectRequests = data;
  
        // Fetch client names
        this.projectRequests.forEach((project) => {
          this.managerService.getClientById(project.clientID).subscribe(
            (client) => {
              project.firstName = client.firstName; 
              project.lastName=client.lastName;
            },
            (error) => {
              console.error(`Error fetching client details for ID ${project.clientID}:`, error);
            }
          );
        });
  
        this.filteredProjects = [...this.projectRequests];
      },
      (error) => {
        this.errorMessage = 'Error fetching project requests'; // Handle error if any
        console.error('Error fetching project requests:', error);
      }
    );
  }
  
  
  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProjects = this.projectRequests.filter(
      (project) =>
        project.projectTitle.toLowerCase().includes(query) ||
        project.projectType.toLowerCase().includes(query)
    );
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredProjects = [...this.projectRequests];
    console.log("fetched");
  }

  toggleCardView(project: ClientsProjectRequestsModel): void {
    this.selectedProject = project;
  }

  closeCardView(): void {
    this.selectedProject = null;
  }

 
  navigateToAddProject(projectRequestID: number): void {
    this.router.navigate(['manager/add-projects', projectRequestID]);
  }
  
  

  viewAttachment(attachmentBase64: string): void {
    const binaryString = atob(attachmentBase64); // Decoding base64 string to binary
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const fileBlob = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(fileBlob);
    window.open(fileURL, '_blank'); // Open PDF in a new tab
  }

}