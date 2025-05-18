import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';


@Component({
  selector: 'app-client-side-bar',
  templateUrl: './client-side-bar.component.html',
  styleUrls: ['./client-side-bar.component.css']
})
export class ClientSideBarComponent implements OnInit {
  showProjectsSubmenu = false; // Track submenu visibility
  fullName: string | null = ''; // Store full name from localStorage
  userImage: string | null = null; // Base64 decoded image string

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    // Fetch FullName from localStorage
    this.fullName = localStorage.getItem('FullName') || 'Guest User';

    // Fetch UserId and Role from localStorage
    const userId = parseInt(localStorage.getItem('UserId') || '0', 10);
    const roleId = parseInt(localStorage.getItem('Role') || '0', 10);

    // Fetch and decode the user's image
    if (userId && roleId) {
      this.clientService.getImageByUserIdAndRoleId(userId, roleId).subscribe(
        (response) => {
          this.userImage = `data:image/png;base64,${response.base64Image}`;
        },
        (error) => {
          console.error('Error fetching user image:', error);
        }
      );
    }
  }

  toggleProjectsSubmenu() {
    this.showProjectsSubmenu = !this.showProjectsSubmenu; // Toggle submenu visibility
  }

  closeProjectsSubmenu() {
    this.showProjectsSubmenu = false; // Close submenu
  }
}
