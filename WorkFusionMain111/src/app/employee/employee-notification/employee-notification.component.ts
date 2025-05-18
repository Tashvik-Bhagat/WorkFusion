import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-employee-notification',
  templateUrl: './employee-notification.component.html',
  styleUrl: './employee-notification.component.css'
})
export class EmployeeNotificationComponent implements OnInit {
  notifications: NotificationModel[] = [];
  entityId: number = 0;
  roleId: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.entityId = parseInt(localStorage.getItem('EntityId') || '0');
    this.roleId = parseInt(localStorage.getItem('Role') || '0');

    // Fetch notifications from the service
    this.employeeService.getNotificationsByEntityAndRole(this.entityId, this.roleId)
      .subscribe(
        (data: NotificationModel[]) => {
          this.notifications = data;
        },
        error => {
          console.error('Error fetching notifications:', error);
        }
      );
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.notificationId === notificationId);
    if (notification) {
      // Update the UI immediately
      notification.isRead = true;

      // Call the API to mark as read
      this.employeeService.markNotificationAsRead(notificationId)
        .subscribe(
          () => console.log(`Notification ${notificationId} marked as read.`),
          error => {
            console.error(`Error marking notification ${notificationId} as read:`, error);
            notification.isRead = false; // Revert the change on error
          }
        );
    }
  }

  deleteNotification(notificationId: number): void {
    this.employeeService.deleteNotification(notificationId).subscribe(
      () => {
        // Remove the notification from the list in the UI
        this.notifications = this.notifications.filter(n => n.notificationId !== notificationId);
      },
      error => {
        console.error('Error deleting notification:', error);
      }
    );
  }
  
 
}
