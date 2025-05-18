import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  departments: any[] = []; // To hold department data
  isLoading = true; // To show a loading spinner
  searchDepartmentId = ''; // To hold the search input value

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.adminService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching departments', error);
        this.isLoading = false;
      }
    });
  }

  searchByDepartmentId(): void {
    if (this.searchDepartmentId) {
      this.departments = this.departments.filter(department =>
        department.departmentId.toString().includes(this.searchDepartmentId)
      );
    } else {
      this.fetchDepartments();
    }
  }

  navigateToAddDepartment(): void {
    this.router.navigate(['admin/department/add-department']); // Navigate to add-department component
  }

  navigateToUpdateDepartment(departmentId: number): void {
    this.router.navigate(['admin/department/update-department',{departmentId}]); // Navigate to update-department component with ID
  }
  
}
