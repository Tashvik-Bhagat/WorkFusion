import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css'],
})
export class ManagerHeaderComponent implements OnInit {
  unreadCount: number = 0;
  entityId: number = 0;
  roleId: number = 0;

  constructor(private router: Router, private managerService: ManagerService) {}

  ngOnInit(): void {
    // Fetch data from localStorage
    this.entityId = Number(localStorage.getItem('EntityId') || 0);
    this.roleId = Number(localStorage.getItem('Role') || 0);

    // Fetch unread notifications if valid data is available
    if (this.entityId && this.roleId) {
      this.getUnreadCount(); // Initial load
    }
  }

  getUnreadCount(): void {
    // Fetch unread notifications when the bell is clicked or on initial load
    if (this.entityId && this.roleId) {
      this.managerService.countUnreadNotifications(this.entityId, this.roleId).subscribe({
        next: (response) => {
          console.log(response); // Debug API response
          // Use 'UnreadCount' as per the API response
          this.unreadCount = response?.unreadCount || 0; // Correct property name
        },
        error: (err) => {
          console.error('Error fetching unread notifications:', err);
        },
      });
    }
  }

  logout(): void {
    localStorage.clear(); // Clear all local storage
    this.router.navigate(['/outer-home']); // Redirect to login/home
  }
}
