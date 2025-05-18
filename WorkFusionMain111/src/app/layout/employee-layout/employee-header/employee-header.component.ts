import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
  unreadCount: number = 0;
  entityId: number = 0;
  roleId: number = 0; 
  
  constructor(private router: Router,private employeeService: EmployeeService) {}

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
      this.employeeService.countUnreadNotifications(this.entityId, this.roleId).subscribe({
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
    localStorage.removeItem('authToken'); // Clear the auth token from local storage
    this.router.navigate(['/outer-home']); // Redirect to the login page
  }
}
