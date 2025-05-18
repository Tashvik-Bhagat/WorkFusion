import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      usernameOrEmail: ['', Validators.required], // Updated to accept username or email
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.clientForm.markAllAsTouched();

    if (this.clientForm.valid) {
      const roleId = 4; // Assuming roleId for Client is 4
      const { usernameOrEmail, password } = this.clientForm.value;

      this.authService.login(roleId, usernameOrEmail, password).subscribe({
        next: (response) => {
          const token = response.token;

          // Decode the JWT token
          const decodedToken: any = jwt_decode(token);

          // Store token and decoded values in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('UserId', decodedToken.UserId);
          localStorage.setItem('UserName', decodedToken.unique_name);
          localStorage.setItem('Role', decodedToken.role);
          localStorage.setItem('EntityId', decodedToken.EntityId);
          localStorage.setItem('FullName', decodedToken.FullName);

          this.router.navigate(['/client']);
          this.toastr.success('Client login successful!', 'Success');
        },
        error: (error) => {
          this.toastr.error('Invalid client credentials!', 'Error');
          console.error('Client login error:', error);
        }
      });
    }
  }
}
