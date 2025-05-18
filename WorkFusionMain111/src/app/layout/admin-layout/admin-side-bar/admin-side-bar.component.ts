import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent {
  employeeMenuVisible: boolean = false;
  managerMenuVisible: boolean = false;
  clientMenuVisible: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes to handle submenu behavior
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Close all menus when navigating to a new route
        this.closeAllMenus();
      }
    });
  }

  // Toggle Employee Submenu
  toggleEmployeeMenu(event: Event): void {
    event.preventDefault();
    this.closeAllMenus();
    this.employeeMenuVisible = !this.employeeMenuVisible;
  }

  // Toggle Manager Submenu
  toggleManagerMenu(event: Event): void {
    event.preventDefault();
    this.closeAllMenus();
    this.managerMenuVisible = !this.managerMenuVisible;
  }

  // Toggle Client Submenu
  toggleClientMenu(event: Event): void {
    event.preventDefault();
    this.closeAllMenus();
    this.clientMenuVisible = !this.clientMenuVisible;
  }

  // Close all submenus
  closeAllMenus(): void {
    this.employeeMenuVisible = false;
    this.managerMenuVisible = false;
    this.clientMenuVisible = false;
  }

  // Navigate to a route and close all menus
  navigate(route: string): void {
    this.closeAllMenus();
    this.router.navigate([route]);
  }

  // Navigate while keeping submenu logic intact (optional for submenu items)
  navigateAndClose(route: string): void {
    this.router.navigate([route]);
    this.closeAllMenus(); // Ensures the menus are closed after navigation
  }
}
