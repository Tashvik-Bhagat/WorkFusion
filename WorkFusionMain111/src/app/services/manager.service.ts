import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagerModel } from '../models/manager.model';
import { ClientsProjectRequestsModel } from '../models/clientProjectRequests.model';
import { ProjectModel } from '../models/projects.model';
import { ClientModel } from '../models/client.model';
import { TaskModel } from '../models/task.model';
import { NotificationModel } from '../models/notification.model';
import { LeaveModel } from '../models/Leave.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'https://localhost:7036/api/Manager'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch image by userId and roleId
  getImageByUserIdAndRoleId(userId: number, roleId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/managerImage/${userId}/${roleId}`,
      { headers: this.getAuthHeaders() }
    );
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

   //-------------------manager---------------------//
   // Get a manager by ID
    getManagerById(managerId: number): Observable<ManagerModel> {
      return this.http.get<ManagerModel>(`${this.apiUrl}/managers/${managerId}`, { headers: this.getAuthHeaders() });
    }

    // Update an existing manager
    updateManager(manager: ManagerModel): Observable<any> {
      return this.http.put(`${this.apiUrl}/updateManager`, manager, { headers: this.getAuthHeaders() });
    }


    //----------------------------projects--------------------------//

      // Fetch all projects
  getAllProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.apiUrl}/projects`,{ headers: this.getAuthHeaders() }); // Assuming projects endpoint
  }

  // Fetch projects assigned to a specific manager by manager ID
  getProjectsForManager(managerId: number): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.apiUrl}/manager/${managerId}`,{ headers: this.getAuthHeaders() });
  }

  // Update project assigned to a manager
  updateProject(id: number, project: any): Observable<ProjectModel> {
    const url = `${this.apiUrl}/projects/${id}`;  
    return this.http.put<ProjectModel>(url, project,{ headers: this.getAuthHeaders() });
  }

  // Fetch a specific project by its ID
  getProjectById(projectId: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(`${this.apiUrl}/projects/${projectId}`,{ headers: this.getAuthHeaders() });
  }

  // Fetch all project requests
  getAllProjectRequests(): Observable<ClientsProjectRequestsModel[]> {
    return this.http.get<ClientsProjectRequestsModel[]>(`${this.apiUrl}/projectsRequests`,{ headers: this.getAuthHeaders() });
  }

  // Fetch project requests for a specific manager by manager ID
  getProjectRequestsManager(managerId: number): Observable<ClientsProjectRequestsModel[]> {
    return this.http.get<ClientsProjectRequestsModel[]>(`${this.apiUrl}/project-requests/${managerId}`,{ headers: this.getAuthHeaders() });
  }


  createProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/projects/`;
    return this.http.post<ProjectModel>(url, project,{ headers: this.getAuthHeaders() })
  }

  //-----------------------client-------------------------------------------
  getClientById(clientId: number): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.apiUrl}/clients/${clientId}`, { headers: this.getAuthHeaders() });
  }


  //-----------------------------employees---------------------------//

   // Fetch employees by ManagerId
   getEmployeesByManagerId(managerId: number): Observable<any> {
    const url = `${this.apiUrl}/GetByManager/${managerId}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

    // Fetch employee by ID
    getEmployeeById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/employees/${id}`, { headers: this.getAuthHeaders() });
    }
  

      //-----------------------------Tasks---------------------------//

  // Add a new task
  addTask(task: TaskModel): Observable<any> {
    const url = `${this.apiUrl}/addtask`;
    return this.http.post<any>(url, task, { headers: this.getAuthHeaders() });
  }

  // Get task by ID
  getTaskById(taskId: number): Observable<TaskModel> {
    const url = `${this.apiUrl}/getTaskbyId/${taskId}`;
    return this.http.get<TaskModel>(url, { headers: this.getAuthHeaders() });
  }

    // Get tasks by manager ID
    getTasksByManagerId(managerId: number): Observable<TaskModel[]> {
      const url = `${this.apiUrl}/getTaskbyManagerId/${managerId}`;
      return this.http.get<TaskModel[]>(url, { headers: this.getAuthHeaders() });
    }
    
  // Get all tasks
  getAllTasks(): Observable<TaskModel[]> {
    const url = `${this.apiUrl}/getAllTasks`;
    return this.http.get<TaskModel[]>(url, { headers: this.getAuthHeaders() });
  }

  // Update task
  updateTask(task: TaskModel): Observable<any> {
    const url = `${this.apiUrl}/updateTasks`;
    return this.http.put<any>(url, task, { headers: this.getAuthHeaders() });
  }

  // Delete task by ID
  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/deleteTasks/${taskId}`;
    return this.http.delete<any>(url, { headers: this.getAuthHeaders() });
  }




  //-------------------------charts-------------------------
  
  getProjectStatusCounts(managerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/manager/${managerId}/project-status-counts`, { headers: this.getAuthHeaders() });
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



            //--------------------------------Leaves-----------------------------------------//
  getPendingLeaves(managerId: number): Observable<LeaveModel[]> {
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/manager/${managerId}/pending`, {
      headers: this.getAuthHeaders(),
    });
  }
  
  getRejectedLeaves(managerId: number): Observable<LeaveModel[]> {
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/manager/${managerId}/rejected`);
  }
  
  getApprovedLeaves(managerId: number): Observable<LeaveModel[]> {
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/approved-leave-requests/${managerId}`);
  }

  approveLeaveRequest(leaveId: number, managerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/leave-requests/${leaveId}/accept?managerId=${managerId}`, null);
  }
  
   // Method to reject a leave request
   rejectLeaveRequest(leaveId: number, managerId: number): Observable<any> {
    const url = `${this.apiUrl}/leave-requests/${leaveId}/reject`;
    return this.http.post<any>(url, null, { params: { managerId: managerId.toString() } });
  }
  
}
