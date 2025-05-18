import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../../models/admin.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  adminData: Admin | null = null;
  isLoading = true;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('UserId')); // Fetch userId from local storage
    console.log('UserId from localStorage:', userId);
    if (userId) {
      this.fetchAdminData(userId);
    } else {
      console.error('User ID not found in local storage.');
      this.isLoading = false;
    }
  }

  fetchAdminData(userId: number): void {
    this.adminService.getAdminsByUserId(userId).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (Array.isArray(response)) {
          this.adminData = response.length > 0 ? response[0] : null; // Assign the first admin if response is an array
        } else {
          this.adminData = response; // Assign directly if response is an object
        }
        console.log('Assigned admin data:', this.adminData);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching admin data:', err);
        this.isLoading = false;
      }
    });
  }

  navigateToUpdate(): void {
    if (this.adminData) {
      // Passing userId instead of adminId
      this.router.navigate(['admin/admin-profile-update', this.adminData.userId]);
    }
  }
  
}
