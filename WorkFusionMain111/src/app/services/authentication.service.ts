import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7036/api/UserLogin/authenticate';

  constructor(private http: HttpClient) {}

  login(roleId: number, usernameOrEmail: string, password: string): Observable<any> {
    const loginData = {
      RoleId: roleId,
      UsernameOrEmail: usernameOrEmail, // Changed field name
      Password: password
    };

    return this.http.post(this.apiUrl, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }
}
