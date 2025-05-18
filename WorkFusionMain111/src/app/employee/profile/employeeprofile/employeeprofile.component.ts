import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  employee: EmployeeModel | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  fetchEmployeeData(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.UserId;

      this.employeeService.getEmployeeByUserId(userId).subscribe({
        next: (data) => (this.employee = data),
        error: (error) => console.error('Error fetching employee data', error)
      });
    }
  }

  navigateToUpdatePage(): void {
    if (this.employee) {
      this.router.navigate(['employee/employee-profile-update', this.employee.employeeId]);
    }
  }
}
