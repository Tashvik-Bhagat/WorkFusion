import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';


@Component({
  selector: 'app-manager-side-bar',
  templateUrl: './manager-side-bar.component.html',
  styleUrls: ['./manager-side-bar.component.css']
})
export class ManagerSideBarComponent implements OnInit {
  userImage: string | undefined;
  userName: string | undefined;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    // Retrieve UserId and RoleId from localStorage
    const userId = parseInt(localStorage.getItem('UserId') || '0', 10); // Use '0' as default if not found
    const roleId = parseInt(localStorage.getItem('Role') || '0', 10); // Use '0' as default if not found

    // Call the service to fetch the image for the user
    this.managerService.getImageByUserIdAndRoleId(userId, roleId).subscribe({
      next: (response) => {
        // Assuming the API returns the image as a base64 string
        this.userImage = response.base64Image;
      },
      error: (err) => {
        console.error('Error fetching image:', err);
        this.userImage = ''; // In case of error, set an empty string or a default image.
      }
    });

    // Retrieve user name from localStorage (if available)
    this.userName = localStorage.getItem('FullName') || 'Unknown User';
  }

  showProjectOptions = false;

  // Toggle the visibility of project options
  toggleProjectOptions() {
    this.showProjectOptions = !this.showProjectOptions;
  }
}
