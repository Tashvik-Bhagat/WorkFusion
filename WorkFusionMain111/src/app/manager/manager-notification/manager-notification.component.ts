import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-notification',
  templateUrl: './manager-notification.component.html',
  styleUrls: ['./manager-notification.component.css']
})
export class ManagerNotificationComponent implements OnInit {
  notifications: NotificationModel[] = [];
  entityId: number = 0;
  roleId: number = 0;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.entityId = parseInt(localStorage.getItem('EntityId') || '0');
    this.roleId = parseInt(localStorage.getItem('Role') || '0');

    // Fetch notifications from the service
    this.managerService.getNotificationsByEntityAndRole(this.entityId, this.roleId)
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
      this.managerService.markNotificationAsRead(notificationId)
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
    this.managerService.deleteNotification(notificationId).subscribe(
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
