import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model'; 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7036/api/User'; 

  constructor(private http: HttpClient) {}

  // Method to register the user via the API
  registerUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
