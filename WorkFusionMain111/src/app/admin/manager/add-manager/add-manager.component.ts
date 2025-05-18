import { Component, OnInit } from '@angular/core';
import { ManagerModel } from '../../../models/manager.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {
  users: UserModel[] = [];
  allUsers: UserModel[] = [];
  searchFullName: string = '';  // Update variable name and type
  managerForm!: FormGroup;  // Initialize as a non-nullable form group
  showManagerForm = false;  // Toggle for showing form
  isSubmitting = false;  // Flag to show loading spinner while submitting
  departments: any[] = [];  // To store department data

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    // Initialize the reactive form to avoid null issues in the template
    this.managerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      phone: [''],
      presentAddress: [''],
      permanentAddress: [''],
      idType: [''],
      idNumber: [''],
      dateOfBirth: [''],
      departmentId: [''],
      hireDate: [''],
      salary: [''],
      userId: [{ value: '', disabled: true }],
      isActive: [true]
    });
  }

  loadUsers(): void {
    const roleId = 2; // Set role ID for filtering (e.g., managers)
    this.adminService.getUsersByRole(roleId).subscribe({
      next: (data: UserModel[]) => {  // Change to UserModel[] if that's what you're receiving
        this.allUsers = data;
        this.users = this.allUsers;  // You can still use UserModel[] for filtering and searching
      },
      error: (error) => {
        console.error('Error fetching users by role:', error);
      }
    });
  }
  

  // Fetch departments when department field is focused
  onDepartmentFocus() {
    this.adminService.getDepartments().subscribe(
      (response: any[]) => {
        this.departments = response;
        console.log('Departments fetched:', this.departments);
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  

  searchByFullName(): void {  // Updated method name and logic
    
  }


  filterUsers(isActive: boolean): void {
    this.users = this.allUsers.filter(user => user.isActive === isActive);
  }


  toggleUserStatus(userId: number, isActive: boolean): void {
    this.adminService.updateUserIsActive(userId, isActive).subscribe({
      next: () => {
        const user = this.users.find(u => u.userId === userId);
        if (user) {
          user.isActive = isActive;
        }
      },
      error: (error) => {
        console.error('Error updating user status:', error.message, error.error);
      }
    });
  }


  openManagerForm(user: UserModel): void {

    // Populate the form with the selected user's data
    this.managerForm.patchValue({
      firstName: user.fullName.split(' ')[0] || '',
      lastName: user.fullName.split(' ')[1] || '',
      email: user.email,
      userId: user.userId,
      isActive: user.isActive
    });
    this.showManagerForm = true;
  }

  closeManagerForm(): void {
    this.showManagerForm = false;
  }

  submitManagerForm(): void {
    if (this.managerForm.valid) {
      this.isSubmitting = true;
      const managerData = {
        ...this.managerForm.getRawValue(), // Get all form values, including disabled fields like `userId`
        userId: this.managerForm.get('userId')?.value // Ensure userId is set explicitly if needed
      };
      this.adminService.createManager(managerData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.loadUsers();  // Reload user list
          this.showManagerForm = false;  // Close form on success
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error submitting form:', error.message, error.error);
        }
      });
    }
  }
  
}
