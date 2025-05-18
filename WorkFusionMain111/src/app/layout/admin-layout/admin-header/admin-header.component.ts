import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  fullName: string | null = ''; // Store full name from localStorage
  userImage: string | null = null; // Store the user's image URL
  activeButton: string | null = null; // Track the active button

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.fullName = localStorage.getItem('FullName') || 'Guest User';
    const userId = parseInt(localStorage.getItem('UserId') || '0', 10);
    const roleId = parseInt(localStorage.getItem('role') || '0', 10);

    if (userId && roleId) {
      this.adminService.getImageByUserIdAndRoleId(userId, roleId).subscribe(
        (response) => {
          this.userImage = `data:image/png;base64,${response.base64Image}`;
        },
        (error) => {
          console.error('Error fetching user image:', error);
        }
      );
    }
  }

  setActive(button: string): void {
    this.activeButton = button; // Set the active button
  }

  logout(): void {
    this.setActive('logout');
    localStorage.clear();
    this.router.navigate(['/outer-home']);
  }

  openprofile(): void {
    this.setActive('profile');
    this.router.navigate(['admin/admin-profile']);
  }

  onnotification(): void {
    this.setActive('notification');
    this.router.navigate(['admin/admin-notification']);
  }
}
