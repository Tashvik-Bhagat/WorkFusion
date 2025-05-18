import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';

@Component({
  selector: 'app-all-team-members',
  templateUrl: './all-team-members.component.html',
  styleUrls: ['./all-team-members.component.css'],
})
export class AllTeamMembersComponent implements OnInit {
  employees: any[] = []; // All employees data
  filteredEmployees: any[] = []; // Filtered employees for display
  searchQuery: string = ''; // Search query
  managerId: number = 0; // Default initialization

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    this.getManagerIdFromLocalStorage();
    this.fetchEmployees();
  }

  // Get ManagerId from Local Storage
  getManagerIdFromLocalStorage(): void {
    const entityId = localStorage.getItem('EntityId');
    this.managerId = entityId ? Number(entityId) : 0;
  }

  // Fetch employees using the ManagerId
  fetchEmployees(): void {
    if (this.managerId) {
      this.managerService.getEmployeesByManagerId(this.managerId).subscribe(
        (data) => {
          this.employees = data;
          this.filteredEmployees = data; // Initialize filtered data
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
    } else {
      console.error('Manager ID is missing or invalid.');
    }
  }

  // Filter employees based on search query
  filterEmployees(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query)
    );
  }

  // Reset search and display all employees
  resetSearch(): void {
    this.searchQuery = '';
    this.filteredEmployees = [...this.employees];
  }

  // Navigate to Team Member Page
  viewMore(employeeId: number): void {
    this.router.navigate([`/manager/team-member/${employeeId}`]);
  }
}
