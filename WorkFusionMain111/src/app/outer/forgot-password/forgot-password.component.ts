import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  otpSent: boolean = false;  // Flag to hide "Send OTP" button
  message: string = '';
  messageType: string = '';

  constructor(
    private forgotPasswordService:ForgotPasswordService,
    private toastr: ToastrService
  ) {}

  // Send OTP function
  onSendOTP(): void {
    if (!this.email) {
      this.toastr.error('Email is required');
      return;
    }

    this.forgotPasswordService.sendOTP(this.email).subscribe(
      (response) => {
        this.otpSent = true;  // Hide the "Send OTP" button after success
        this.toastr.success('OTP sent successfully');
      },
      (error) => {
        this.toastr.error('Error sending OTP: ' + error.message);
      }
    );
  }

  // Reset Password function
  onResetPassword(): void {
    if (!this.otp || !this.newPassword) {
      this.toastr.error('OTP and New Password are required');
      return;
    }

    this.forgotPasswordService.resetPassword(this.email, this.otp, this.newPassword).subscribe(
      (response) => {
        this.toastr.success('Password reset successfully');
        // Reset the form after successful reset
        this.otpSent = false;
        this.email = '';
        this.otp = '';
        this.newPassword = '';
      },
      (error) => {
        this.toastr.error('Error resetting password: ' + error.message);
      }
    );
  }
}
