import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  users: UserModel[] = [];
  allUsers: UserModel[] = [];
  searchFullName: string = '';  // Update variable name and type
  employeeForm!: FormGroup;  // Initialize as a non-nullable form group
  showEmployeeForm = false;  // Toggle for showing form
  isSubmitting = false;  // Flag to show loading spinner while submitting
  departments: any[] = [];  // To store department data

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    // Initialize the reactive form to avoid null issues in the template
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userId: [{ value: '', disabled: true }],
      gender: [''],
      phone: [''],
      presentAddress: [''],
      permanentAddress: [''],
      idType: [''],
      idNumber: [''],
      dateOfBirth: [''],
      departmentId: [''],
      hireDate: [''],
      currentSalary: [''],
      isActive: [true]
    });
  }

  loadUsers(): void {
    const roleId = 3; // Set role ID for filtering (e.g., employees)
    this.adminService.getUsersByRole(roleId).subscribe({
      next: (data: UserModel[]) => {
        this.allUsers = data;
        this.users = this.allUsers;
      },
      error: (error) => {
        console.error('Error fetching users by role:', error);
      }
    });
  }


  // Fetch departments when department field is focused
  onDepartmentFocus() {
    this.adminService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response;
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  searchByFullName(): void {  // Updated method name and logic
    if (this.searchFullName.trim()) {
      const fullNameLowerCase = this.searchFullName.toLowerCase();
      this.users = this.allUsers.filter(user => 
        user.fullName.toLowerCase().includes(fullNameLowerCase)
      );
    } else {
      this.users = this.allUsers;  // Reset if search term is empty
    }
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

  openEmployeeForm(user: UserModel): void {
    this.showEmployeeForm = true;

    // Populate the form with the selected user's data
    this.employeeForm.patchValue({
      firstName: user.fullName.split(' ')[0] || '',
      lastName: user.fullName.split(' ')[1] || '',
      email: user.email,
      userId: user.userId,
      isActive: user.isActive
    });
  }

  closeEmployeeForm(): void {
    this.showEmployeeForm = false;
    this.employeeForm.reset(); // Reset form instead of setting it to null
  }

  submitEmployeeForm(): void {
    if (this.employeeForm.valid) {
      const newEmployeeData = this.employeeForm.getRawValue(); // Include disabled fields
      console.log('New Employee Data:', newEmployeeData);

      // Show spinner while submitting
      this.isSubmitting = true;

      // Call the service to create a new employee
      this.adminService.createEmployee(newEmployeeData).subscribe({
        next: (response) => {
          console.log('Employee created successfully:', response);
          this.isSubmitting = false;
          this.closeEmployeeForm();
        },
        error: (error) => {
          console.error('Error creating employee:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  copyPresentToPermanentAddress(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      const presentAddress = this.employeeForm.get('presentAddress')?.value;
      this.employeeForm.patchValue({
        permanentAddress: presentAddress
      });
    } else {
      this.employeeForm.patchValue({
        permanentAddress: ''
      });
    }
  }
}
