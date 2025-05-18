import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  departments: any[] = [];
  showDetails = false;
  selectedEmployee: any;
  searchText: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDepartments();
  }

  fetchEmployees() {
    this.adminService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  fetchDepartments() {
    this.adminService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(dept => dept.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown';
  }

  showMore(employee: any) {
    this.selectedEmployee = employee;
    this.showDetails = true;
  }

  goToUpdateEmployee(employeeId: number) {
    this.router.navigate(['admin/employee/update-employee', employeeId]);
  }

  // Updated search function
  searchEmployee() {
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      this.filteredEmployees = this.employees.filter(employee => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        const departmentName = this.getDepartmentName(employee.departmentId).toLowerCase();
        return fullName.includes(searchLower) || departmentName.includes(searchLower);
      });
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  resetSearch() {
    this.searchText = '';
    this.filteredEmployees = this.employees;
  }
}
