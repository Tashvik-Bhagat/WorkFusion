import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';
import { TaskModel } from '../../../models/task.model';
import { ProjectModel } from '../../../models/projects.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  taskId: number | null = null;
  task: TaskModel = {} as TaskModel;
  employees: any[] = [];
  projects: ProjectModel[] = []; // To store projects
  isLoading: boolean = false;
  errorMessage: string = '';
  dropdownOpen = false;
  selectedEmployee: any = null;
  selectedProject: ProjectModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService,
        private toastr: ToastrService // Inject ToastrService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = Number(params.get('id'));
      if (this.taskId) {
        this.fetchTaskDetails(this.taskId);
      }
    });
    this.fetchEmployees();
    this.fetchProjects();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.task.assignedTo = employee.employeeId; // Bind to task model
    this.dropdownOpen = false; // Close dropdown
  }

  // Fetch task details by ID
  fetchTaskDetails(taskId: number): void {
    this.isLoading = true;
    this.managerService.getTaskById(taskId).subscribe({
      next: (data: TaskModel) => {
        this.task = data;
        this.selectedProject = this.projects.find(project => project.projectId === this.task.projectId) || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching task:', err);
        this.errorMessage = 'Failed to fetch task details.';
        this.isLoading = false;
      },
    });
  }

  // Fetch all employees assigned to the manager
  fetchEmployees(): void {
    const managerId = Number(localStorage.getItem('EntityId')); // Retrieve managerId from local storage
    this.managerService.getEmployeesByManagerId(managerId).subscribe({
      next: (data: any[]) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = 'Failed to fetch employees.';
      },
    });
  }

  // Fetch all projects for the manager
  fetchProjects(): void {
    const managerId = Number(localStorage.getItem('EntityId')); // Retrieve managerId from local storage
    this.managerService.getProjectsForManager(managerId).subscribe({
      next: (data: ProjectModel[]) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.errorMessage = 'Failed to fetch projects.';
      },
    });
  }

  // Submit the form and update task
  onSubmit(): void {
    if (!this.taskId) return;
    this.isLoading = true;

    // Bind selected project to task model
    if (this.selectedProject) {
      this.task.projectId = this.selectedProject.projectId;
    }

    this.managerService.updateTask(this.task).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Task updated successfully!', 'Success'); // Show success toaster
        this.router.navigate(['/manager/list-all-tasks']); // Navigate back to projects list
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.toastr.error('Failed to update Tasks. Please try again.', 'Error');
      },
    });
  }
}
