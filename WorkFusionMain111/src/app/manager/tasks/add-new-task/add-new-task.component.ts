import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';
import { TaskModel } from '../../../models/task.model';
import { ProjectModel } from '../../../models/projects.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit {
  task: TaskModel = {} as TaskModel;
  employees: any[] = [];
  projects: ProjectModel[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  dropdownOpen = false;
  selectedEmployee: any = null;

  constructor(
    private router: Router,
    private managerService: ManagerService,
        private toastr: ToastrService // Inject ToastrService 
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchProjects();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.task.assignedTo = employee.employeeId;
    this.dropdownOpen = false;
  }

  // Fetch all employees
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

  // Fetch all projects
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

  // Submit the form and add new task
  onSubmit(): void {
    this.isLoading = true;
    
    // Retrieve managerId from localStorage and set it to the 'assignedBy' field
    const managerId = Number(localStorage.getItem('EntityId'));
    this.task.assignedBy = managerId;

    if (this.selectedEmployee) {
      this.task.assignedTo = this.selectedEmployee.employeeId;
    }

    this.managerService.addTask(this.task).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Task Added successfully!', 'Success'); // Show success toaster
        this.router.navigate(['/manager/list-all-tasks']); // Navigate back to projects list
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.toastr.error('Failed to Add Tasks. Please try again.', 'Error');
      },
    });
  }
}
