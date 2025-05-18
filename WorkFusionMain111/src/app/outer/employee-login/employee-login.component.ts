import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
})
export class EmployeeLoginComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    this.employeeForm.markAllAsTouched();

    if (this.employeeForm.valid) {
      const roleId = 3; // RoleId for Employee
      const { usernameOrEmail, password } = this.employeeForm.value;

      this.authService.login(roleId, usernameOrEmail, password).subscribe({
        next: (response) => {
          const token = response.token;
          const decodedToken: any = jwt_decode(token);

          // Store the token in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('UserId', decodedToken.UserId);
          localStorage.setItem('UserName', decodedToken.unique_name);
          localStorage.setItem('Role', decodedToken.role);
          localStorage.setItem('EntityId', decodedToken.EntityId);
          localStorage.setItem('FullName', decodedToken.FullName);

          // Navigate to employee dashboard
          this.router.navigate(['/employee']); // Adjust path if needed

          // Display success message
          this.toastr.success('Employee login successful!', 'Success');
          console.log('Employee token saved to localStorage:', token);
        },
        error: (error) => {
          this.toastr.error('Invalid employee credentials!', 'Error');
          console.error('Employee login error:', error);
        }
      });
    }
  }
}
