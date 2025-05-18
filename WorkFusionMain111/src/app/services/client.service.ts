import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsProjectRequestsModel } from '../models/clientProjectRequests.model';
import { ClientModel } from '../models/client.model';
import { ProjectModel } from '../models/projects.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7036/api/Client'; // Update with the actual API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all project requests
  getAllProjectsRequests(): Observable<ClientsProjectRequestsModel[]> {
    return this.http.get<ClientsProjectRequestsModel[]>(`${this.apiUrl}/projectsRequests`, {
      headers: this.getAuthHeaders()
    });
  }

  // Fetch project request by ID
  getProjectRequestById(projectRequestID: number): Observable<ClientsProjectRequestsModel> {
    return this.http.get<ClientsProjectRequestsModel>(`${this.apiUrl}/projectsRequests/${projectRequestID}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Create a new project request
  createProjectRequest(projectRequest: ClientsProjectRequestsModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/projectsRequests`, projectRequest, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing project request
  updateProjectRequest(projectRequest: ClientsProjectRequestsModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/projectsRequests/${projectRequest.projectRequestID}`, projectRequest, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a project request
  deleteProjectRequest(projectRequestID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projectsRequests/${projectRequestID}`, {
      headers: this.getAuthHeaders()
    });
  }

//------------------------------departments-------------------------//
 // Fetch all departments
 getDepartments(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/departments`, { headers: this.getAuthHeaders() });
}

//-------------------------clientimage--------------------------------//

 // Fetch image by userId and roleId
 getImageByUserIdAndRoleId(userId: number, roleId: number): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/clientImage/${userId}/${roleId}`,
    { headers: this.getAuthHeaders() }
  );
}

//------------------------------client-------------------------------//
getClientById(clientId: number): Observable<ClientModel> {
  return this.http.get<ClientModel>(`${this.apiUrl}/clients/${clientId}`, { headers: this.getAuthHeaders() });
}

updateClient(client: ClientModel): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateClient`, client, { headers: this.getAuthHeaders() });
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

//---------------------projects -----------------------
getProjectsByClientId(): Observable<ProjectModel[]> {
  const clientId = localStorage.getItem('EntityId');
  return this.http.get<ProjectModel[]>(`${this.apiUrl}/projects/${clientId}`);
}


}
