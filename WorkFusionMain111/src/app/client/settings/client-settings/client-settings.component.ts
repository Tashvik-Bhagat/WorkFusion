import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrls: ['./client-settings.component.css']
})
export class ClientSettingsComponent {
  constructor(private router: Router) {}

  // Navigate to respective routes
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Reset password logic
  resetPassword(): void {
    this.router.navigate(['client/client-reset-password']);
  }
}

