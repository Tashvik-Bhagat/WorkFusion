import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import jwt_decode from 'jwt-decode'; // Import jwt-decode

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent {
  managerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.managerForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false] // Optional remember me functionality
    });
  }

  onSubmit() {
    this.managerForm.markAllAsTouched(); // Mark all fields as touched

    if (this.managerForm.valid) {
      const roleId = 2; // Assuming roleId for Manager is 2
      const { usernameOrEmail, password } = this.managerForm.value;

      this.authService.login(roleId, usernameOrEmail, password).subscribe({
        next: (response) => {
          const token = response.token; // Assuming response contains a token

          // Decode the JWT token
          const decodedToken: any = jwt_decode(token);

          // Store the token and its decoded values in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('UserId', decodedToken.UserId);
          localStorage.setItem('UserName', decodedToken.unique_name);
          localStorage.setItem('Role', decodedToken.role);
          localStorage.setItem('EntityId', decodedToken.EntityId);
          localStorage.setItem('FullName', decodedToken.FullName);

          // Navigate to the manager dashboard (adjust path if necessary)
          this.router.navigate(['/manager']);

          // Display success message
          this.toastr.success('Manager login successful!', 'Success');
          console.log('Decoded token values stored in localStorage:', decodedToken);
        },
        error: (error) => {
          this.toastr.error('Invalid manager credentials!', 'Error');
          console.error('Manager login error:', error);
        }
      });
    }
  }
}
