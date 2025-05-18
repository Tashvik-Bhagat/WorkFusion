import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-settings',
  templateUrl: './manager-settings.component.html',
  styleUrl: './manager-settings.component.css'
})
export class ManagerSettingsComponent {
  constructor(private router: Router) {}

  // Navigate to respective routes
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Reset password logic
  resetPassword(): void {
    this.router.navigate(['manager/manager-reset-password']);
  }
}
