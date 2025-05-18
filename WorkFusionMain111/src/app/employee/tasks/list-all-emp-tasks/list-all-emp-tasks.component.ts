import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../models/task.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-list-all-emp-tasks',
  templateUrl: './list-all-emp-tasks.component.html',
  styleUrl: './list-all-emp-tasks.component.css'
})
export class ListAllEmpTasksComponent implements OnInit{
 tasks: TaskModel[] = []; // Array to hold the list of tasks
  filteredTasks: TaskModel[] = []; // Array to hold filtered tasks
  searchTerm: string = ''; // Search term for filtering
  isLoading: boolean = false; // Loading state for spinner
  errorMessage: string = ''; // Error handling

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  // Method to fetch tasks by manager ID
  fetchTasks(): void {
    const employeeId = Number(localStorage.getItem('EntityId')); // Retrieve managerId from local storage
    if (!employeeId) {
      this.errorMessage = 'Manager ID not found in local storage.';
      return;
    }

    this.isLoading = true; // Start loading spinner
    this.employeeService.getTasksByEmployeeId(employeeId).subscribe({
      next: (data: TaskModel[]) => {
        this.tasks = data; // Store the fetched tasks
        this.filteredTasks = [...this.tasks]; // Initialize filtered tasks
        this.isLoading = false; // Stop loading spinner
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        this.isLoading = false; // Stop loading spinner
      }
    });
  }

  // Method to filter tasks based on the search term
  filterTasks(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.taskName.toLowerCase().includes(lowerCaseSearchTerm) ||
      (task.projectName?.toLowerCase().includes(lowerCaseSearchTerm) ?? false) ||
      (task.employeeName?.toLowerCase().includes(lowerCaseSearchTerm) ?? false) ||
      task.priority.toLowerCase().includes(lowerCaseSearchTerm) ||
      task.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

}
