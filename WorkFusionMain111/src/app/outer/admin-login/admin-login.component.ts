import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Import Router if navigation is needed
import { AuthenticationService } from '../../services/authentication.service';
import jwt_decode from 'jwt-decode'; // Import jwt-decode library

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router // Inject Router for navigation
  ) {
    this.adminForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false] // Optional remember me functionality
    });
  }

  onSubmit() {
    this.adminForm.markAllAsTouched(); // Mark all fields as touched

    if (this.adminForm.valid) {
      const roleId = 1; // Assuming roleId for Admin is 1
      const { usernameOrEmail, password } = this.adminForm.value;

      this.authService.login(roleId, usernameOrEmail, password).subscribe({
        next: (response) => {
          const token = response.token; // Assuming response contains a token

          try {
            // Decode the token
            const decodedToken: any = jwt_decode(token);

            // Extract and store required values in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('UserId', decodedToken.UserId);
            localStorage.setItem('unique_name', decodedToken.unique_name);
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('EntityId', decodedToken.EntityId);
            localStorage.setItem('FullName', decodedToken.FullName);

            console.log('Decoded Token:', decodedToken);

            // Navigate to the admin dashboard (adjust path if necessary)
            this.router.navigate(['/admin']);

            // Display success message
            this.toastr.success('Admin login successful!', 'Success');
          } catch (error) {
            console.error('Token decoding error:', error);
            this.toastr.error('Failed to decode token!', 'Error');
          }
        },
        error: (error) => {
          this.toastr.error('Invalid admin credentials!', 'Error');
          console.error('Admin login error:', error);
        }
      });
    }
  }
}
