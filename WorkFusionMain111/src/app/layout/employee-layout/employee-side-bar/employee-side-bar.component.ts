import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-side-bar',
  templateUrl: './employee-side-bar.component.html',
  styleUrls: ['./employee-side-bar.component.css']
})
export class EmployeeSideBarComponent implements OnInit {
  employeeName: string = 'Unknown Employee'; // Default value
  employeeImage: string = 'assets/default-profile.jpg'; // Default profile picture

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.setEmployeeDetails();
  }

  private setEmployeeDetails(): void {
    // Retrieve values from localStorage
    const userId = parseInt(localStorage.getItem('UserId') || '0', 10);
    const roleId = parseInt(localStorage.getItem('Role') || '0', 10);
    const fullName = localStorage.getItem('FullName') || 'Unknown Employee';

    this.employeeName = fullName; // Display employee name

    // Fetch the employee's profile image using the service
    if (userId && roleId) {
      this.employeeService.getImageByUserIdAndRoleId(userId, roleId).subscribe({
        next: (response) => {
          // Assuming response contains a base64 image string
          this.employeeImage = `data:image/png;base64,${response.base64Image}`;
        },
        error: (err) => {
          console.error('Error fetching employee image:', err);
          this.employeeImage = 'assets/default-profile.jpg'; // Fallback to default
        }
      });
    } else {
      console.error('UserId or RoleId is invalid.');
    }
  }
}
