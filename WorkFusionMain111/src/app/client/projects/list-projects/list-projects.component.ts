import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { ProjectModel } from '../../../models/projects.model';


@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent {
  isDetailsView = false;
  selectedProject: any;
  searchQuery: string = '';
  filteredProjects: ProjectModel[] = [];
  projects: ProjectModel[] = [];

  // Injecting the ClientService properly in the constructor
  constructor(private clientService:  ClientService ) {}

  ngOnInit(): void {
    // Fetch projects on component load
    this.getProjects();
  }

  toggleDetails(project: any): void {
    this.selectedProject = project;
    this.isDetailsView = true;
  }

  backToList(): void {
    this.isDetailsView = false;
  }

  getProjects(): void {
    // Calling the service method to get projects by clientId
    this.clientService. getProjectsByClientId().subscribe(
      (data: ProjectModel[]) => {
        this.projects = data;  // Store the fetched data
        this.filteredProjects = data;  // Initialize filtered projects
      },
      (error: any) => { // Fixed error handling
        console.error('Error fetching projects for client:', error);
      }
    );
  }

  searchProjects(): void {
    if (this.searchQuery) {
      this.filteredProjects = this.projects.filter(project =>
        project.projectName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProjects = this.projects;
    }
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredProjects = this.projects;
  }
  viewAttachment(): void {
    if (!this.selectedProject.attachments) {
      console.error('No attachment found.');
      return;
    }
  
    const base64Data = this.selectedProject.attachments.split(',')[1]; // Extract Base64 data
    const mimeType = this.getMimeType(this.selectedProject.attachments); // Determine MIME type
  
    if (!base64Data || !mimeType) {
      console.error('Invalid attachment data or MIME type.');
      return;
    }
  
    const byteArray = new Uint8Array(
      atob(base64Data).split('').map((char) => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: mimeType });
    const fileURL = URL.createObjectURL(file);
  
    // Handle viewing based on MIME type
    if (mimeType.startsWith('image/')) {
      // Open image in a new tab
      window.open(fileURL, '_blank');
    } else if (mimeType === 'application/pdf') {
      // Open PDF in a new tab
      window.open(fileURL, '_blank');
    } else {
      // For other formats (e.g., Word), prompt download as fallback
      console.warn('File format not directly viewable, prompting download.');
      this.downloadAttachment();
    }
  }
  
  downloadAttachment(): void {
    if (!this.selectedProject.attachments) {
      console.error('No attachment found.');
      return;
    }
  
    const base64Data = this.selectedProject.attachments.split(',')[1]; // Extract Base64 data
    const mimeType = this.getMimeType(this.selectedProject.attachments); // Determine MIME type
  
    if (!base64Data || !mimeType) {
      console.error('Invalid attachment data or MIME type.');
      return;
    }
  
    const byteArray = new Uint8Array(
      atob(base64Data).split('').map((char) => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: mimeType });
    const fileURL = URL.createObjectURL(file);
  
    // Create a link element for download
    const link = document.createElement('a');
    link.href = fileURL;
  
    // Set default file name with appropriate extension
    const extension = this.getExtensionFromMimeType(mimeType);
    link.download = `attachment.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Utility method to extract MIME type from Base64 string
  getMimeType(base64String: string): string | null {
    const matches = base64String.match(/^data:(.+);base64,/);
    return matches ? matches[1] : null;
  }
  
  // Utility method to get file extension from MIME type
  getExtensionFromMimeType(mimeType: string): string {
    const mimeMap: { [key: string]: string } = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
    };
  
    return mimeMap[mimeType] || 'unknown'; // Default to 'unknown' if MIME type not mapped
  }
}
