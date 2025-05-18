import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { TaskCountModel, TaskModel, TaskStatusModel } from '../models/task.model';
import { ProjectModel } from '../models/projects.model';
import { NotificationModel } from '../models/notification.model';
import { LeaveModel } from '../models/Leave.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7036/api/Employee'; // Your API base URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEmployeeByUserId(userId: number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${userId}`);
  }

    // Fetch employee by ID
    getEmployeeById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/employees/${id}`, { headers: this.getAuthHeaders() });
    }
  
  // Update an existing employee
  updateEmployee(employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateEmployee`, employeeData, { headers: this.getAuthHeaders() });
  }

    // Fetch image by userId and roleId
    getImageByUserIdAndRoleId(userId: number, roleId: number): Observable<any> {
      return this.http.get<any>(
        `${this.apiUrl}/employeeImage/${userId}/${roleId}`,
        { headers: this.getAuthHeaders() }
      );
    }

    ///-------------------------departments-----------------------------//
      // Fetch all departments
  getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/departments`, { headers: this.getAuthHeaders() });
  }
  

   //------------------------------ Reset Password ------------------------------//
 resetPassword(userId: number, username: string, currentPassword: string, newPassword: string): Observable<any> {
  const headers = this.getAuthHeaders();
  const params = new HttpParams()
    .set('userId', userId.toString())
    .set('username', username)
    .set('currentPassword', currentPassword)
    .set('newPassword', newPassword);

  // Specify responseType: 'text' to handle plain text responses
  return this.http.post(`${this.apiUrl}/reset-password`, null, {
    headers,
    params,
    responseType: 'text' as 'json' // Casting the type to avoid type issues
  });
}

//------------------tasks------------------------------
  // Get tasks by Employee ID
    getTasksByEmployeeId(employeeId: number): Observable<TaskModel[]> {
      const url = `${this.apiUrl}/getTaskbyEmployeeId/${employeeId}`;
      return this.http.get<TaskModel[]>(url, { headers: this.getAuthHeaders() });
    }    

        
      // Update task
      updateTaskStatus(task: TaskStatusModel): Observable<any> {
        const url = `${this.apiUrl}/updateTasksStatus`;
        return this.http.put<any>(url, task, { headers: this.getAuthHeaders() });
      }
     // Get task by ID
  getTaskById(taskId: number): Observable<TaskModel> {
    const url = `${this.apiUrl}/getTaskbyId/${taskId}`;
    return this.http.get<TaskModel>(url, { headers: this.getAuthHeaders() });
  }

  //------------------------projects ---------------------------
    // Get projects by Employee ID
    getProjectsByEmployeeId(employeeId: number): Observable<ProjectModel[]> {
      const url = `${this.apiUrl}/GetProjectsByEmployeeId/${employeeId}`;
      return this.http.get<ProjectModel[]>(url, { headers: this.getAuthHeaders() });
    }


    //----------------graphs-----------------
    // Get task counts by Employee ID
    getTaskCountsByEmployeeId(employeeId: number): Observable<TaskCountModel> {
      const url = `${this.apiUrl}/TasksCounts/${employeeId}`;
      return this.http.get<TaskCountModel>(url, { headers: this.getAuthHeaders() });
    }



       //-------------------notifications-------------------
        // Get notifications by EntityId and RoleId
        getNotificationsByEntityAndRole(entityId: number, roleId: number): Observable<NotificationModel[]> {
          return this.http.get<NotificationModel[]>(
            `${this.apiUrl}/GetNotificationByEntityId/${entityId}/RoleId/${roleId}`,
            { headers: this.getAuthHeaders() }
          );
        }
        

              // Mark notification as read
        markNotificationAsRead(notificationId: number): Observable<any> {
          return this.http.put<any>(
            `${this.apiUrl}/markRead/${notificationId}`,
            {},
            { headers: this.getAuthHeaders() }
          );
        }


        deleteNotification(notificationId: number): Observable<any> {
          return this.http.delete(`${this.apiUrl}/DeleteNotification/${notificationId}`, {
            headers: this.getAuthHeaders(),
          });
        }
        

        // Fetch unread notification count by entityId and roleId
        countUnreadNotifications(entityId: number, roleId: number): Observable<{ unreadCount: number }> {
          return this.http.get<{ unreadCount: number }>(
            `${this.apiUrl}/CountUnreadNotification/${entityId}/${roleId}`,
            { headers: this.getAuthHeaders() }
          );
        }


        // Fetch leave requests by employee ID
   getLeavesByEmployeeId(employeeId: number): Observable<LeaveModel[]> {
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/GetEmployeeLeaves/${employeeId}`);
  }

  submitLeaveRequest(leaveRequest: LeaveModel): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/submit-leave-request`, leaveRequest);
  }

}
