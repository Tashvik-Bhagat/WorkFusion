export interface NotificationModel {
    notificationId: number;
    entityId: number;
    roleId: number;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }
  