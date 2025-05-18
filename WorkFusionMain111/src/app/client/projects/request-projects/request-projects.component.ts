import { Component, OnInit } from '@angular/core';
import { ClientsProjectRequestsModel } from '../../../models/clientProjectRequests.model';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-projects',
  templateUrl: './request-projects.component.html',
  styleUrls: ['./request-projects.component.css'],
})
export class RequestProjectsComponent implements OnInit {
  projectRequests: ClientsProjectRequestsModel[] = [];
  filteredProjects: ClientsProjectRequestsModel[] = [];
  clientId: number | null = null;
  selectedProject: ClientsProjectRequestsModel | null = null;
  searchQuery: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.clientId = Number(decodedToken.EntityId);

      if (this.clientId) {
        this.fetchProjectRequests();
      } else {
        console.error('Client ID not found in token!');
      }
    } else {
      console.error('Token not found!');
    }
  }

  fetchProjectRequests(): void {
    this.clientService.getAllProjectsRequests().subscribe({
      next: (data) => {
        this.projectRequests = data.filter(
          (project) => project.clientID === this.clientId
        );
        this.filteredProjects = [...this.projectRequests];
      },
      error: (err) => {
        console.error('Error fetching project requests:', err);
      },
    });
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
  }

  toggleCardView(project: ClientsProjectRequestsModel): void {
    this.selectedProject = project;
  }

  closeCardView(): void {
    this.selectedProject = null;
  }

  navigateToNewRequest(): void {
    this.router.navigate(['client/request-new-projects']);
  }

  navigateToUpdate(projectRequestID: number): void {
    this.router.navigate(['client/update-requested-projects', projectRequestID]);
  }

  deleteProject(projectRequestID: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteProjectRequest(projectRequestID).subscribe({
          next: () => {
            this.projectRequests = this.projectRequests.filter(
              (project) => project.projectRequestID !== projectRequestID
            );
            this.filteredProjects = this.filteredProjects.filter(
              (project) => project.projectRequestID !== projectRequestID
            );
            this.closeCardView();
            Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the project.',
              'error'
            );
            console.error('Error deleting project:', err);
          },
        });
      }
    });
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
