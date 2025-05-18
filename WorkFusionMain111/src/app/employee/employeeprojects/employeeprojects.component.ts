import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { ProjectModel } from '../../models/projects.model';
import { ManagerService } from '../../services/manager.service';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employeeprojects',
  templateUrl: './employeeprojects.component.html',
  styleUrl: './employeeprojects.component.css'
})
export class EmployeeprojectsComponent implements OnInit {
  projects: ProjectModel[] = [];
  filteredProjects: ProjectModel[] = [];
  isDetailsView = false;
  selectedProject: ProjectModel = {} as ProjectModel;
  employeeId: number = 0;
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    const EntityId = localStorage.getItem('EntityId'); // Retrieve manager ID from localStorage
    if (EntityId) {
      this.employeeId = parseInt(EntityId, 10); // Convert string to number
      this.loadProjectsForManager();
    } else {
      console.error('Manager ID not found in localStorage. Redirecting to login...');
      this.router.navigate(['/login']); // Redirect to login if ID is not found
    }
  }

  loadProjectsForManager(): void {
    this.employeeService.getProjectsByEmployeeId(this.employeeId).subscribe({
      next: (data: ProjectModel[]) => {
        console.log('Projects fetched for employee:', data);
        this.projects = Array.isArray(data) ? data : [data];
        this.filteredProjects = this.projects;
      },
      error: (err: any) => {
        console.error('Error fetching projects for employee:', err);
      },
    });
  }

  searchProjects(): void {
    if (this.searchQuery) {
      this.filteredProjects = this.projects.filter(project =>
        project.projectName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (project.clientFirstName + ' ' + project.clientLastName).toLowerCase().includes(this.searchQuery.toLowerCase()) // Include client name in search
      );
    } else {
      this.filteredProjects = this.projects;
    }
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredProjects = this.projects;
  }

  toggleDetails(projectId: number): void {
    const project = this.projects.find((p) => p.projectId === projectId);
    if (project) {
      this.selectedProject = project;
      this.isDetailsView = true;
    }
  }


  backToList(): void {
    this.isDetailsView = false;
  }

  updateProgress() {
    // You can add any additional logic here if needed
  }

  viewAttachment(): void {
    if (!this.selectedProject.attachments) {
      console.error('No attachment found.');
      return;
    }

    const base64 = this.selectedProject.attachments.split(',')[1]; // Extract Base64 content after "data:application/pdf;base64,"
    if (!base64) {
      console.error('Invalid base64 string.');
      return;
    }

    const byteArray = new Uint8Array(
      atob(base64).split('').map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank'); // Open PDF in a new tab
  }

  downloadAttachment(): void {
    if (!this.selectedProject.attachments) {
      console.error('No attachment found.');
      return;
    }

    const base64 = this.selectedProject.attachments.split(',')[1]; // Extract Base64 content after "data:application/pdf;base64,"
    if (!base64) {
      console.error('Invalid base64 string.');
      return;
    }

    const byteArray = new Uint8Array(
      atob(base64).split('').map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    // Create a link element
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'attachment.pdf'; // Set default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
