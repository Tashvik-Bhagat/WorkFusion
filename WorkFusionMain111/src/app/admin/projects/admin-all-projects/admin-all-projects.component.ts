import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../../models/projects.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-all-projects',
  templateUrl: './admin-all-projects.component.html',
  styleUrls: ['./admin-all-projects.component.css']
})
export class AdminAllProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];
  filteredProjects: ProjectModel[] = [];
  selectedProject: ProjectModel | null = null;
  searchQuery: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.adminService.getAllProjects().subscribe(
      (data: ProjectModel[]) => {
        this.projects = data;
        this.filteredProjects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  filterProjects(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      project.projectName.toLowerCase().includes(query)
    );
  }

  viewProjectDetails(project: ProjectModel): void {
    this.selectedProject = project;
  }

  closeDetails(): void {
    this.selectedProject = null;
  }
}
