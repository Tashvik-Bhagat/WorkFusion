import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { ManagerModel } from '../../../models/manager.model';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  managers: ManagerModel[] = [];
  filteredManagers: ManagerModel[] = [];
  departments: any[] = [];
  showDetails = false;
  selectedManager: ManagerModel | null = null; // Initialize with null
  searchText: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchManagers();
    this.fetchDepartments();
  }

  fetchManagers() {
    this.adminService.getAllManagers().subscribe(
      (data) => {
        this.managers = data;
        this.filteredManagers = data;
      },
      (error) => {
        console.error('Error fetching managers', error);
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

  showMore(manager: ManagerModel) {
    this.selectedManager = manager;
    this.showDetails = true;
  }

  goToUpdateManager(managerId: number) {
      this.router.navigate(['admin/manager/update-manager', managerId]);  
  }
  


  searchManager() {
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      this.filteredManagers = this.managers.filter(manager => {
        const fullName = `${manager.firstName} ${manager.lastName}`.toLowerCase();
        const departmentName = this.getDepartmentName(manager.departmentId).toLowerCase();
        return fullName.includes(searchLower) || departmentName.includes(searchLower);
      });
    } else {
      this.filteredManagers = this.managers;
    }
  }

  resetSearch() {
    this.searchText = '';
    this.filteredManagers = this.managers;
  }
}
