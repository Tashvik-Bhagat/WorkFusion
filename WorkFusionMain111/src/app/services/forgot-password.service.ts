import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = 'https://localhost:7036/api/ForgotPassword';

  constructor(private http: HttpClient) {}

  // Service to send OTP to the provided email
  sendOTP(email: string): Observable<any> {
    const model = { Email: email };
    
    return this.http.post(`${this.apiUrl}/SendOTP`, model, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Service to reset the password using the provided email, OTP, and new password
  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    const model = { Email: email, OTP: otp, NewPassword: newPassword };
    
    return this.http.post(`${this.apiUrl}/ResetPassword`, model, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
