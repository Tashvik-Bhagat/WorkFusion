import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrl: './employee-settings.component.css'
})
export class EmployeeSettingsComponent {
  constructor(private router: Router) {}

  // Navigate to respective routes
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Reset password logic
  resetPassword(): void {
    this.router.navigate(['employee/employee-reset-password']);
  }
}
