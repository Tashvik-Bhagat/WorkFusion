import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ClientModel } from '../../../models/client.model';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  users: UserModel[] = [];
  allUsers: UserModel[] = [];
  searchFullName: string = '';
  clientForm!: FormGroup;
  showClientForm = false; 
  isSubmitting = false;  // Flag to show loading spinner while submitting

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initializeForm();
  }

  // Initialize the client form with necessary fields
  initializeForm(): void {
    this.clientForm= this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      phone: ['', Validators.required],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      idType: [''],
      idNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userId: [{ value: '', disabled: true }],
      isActive: [true]
    });
  }

  loadUsers(): void {
    const roleId = 4; // Set role ID for filtering (e.g., managers)
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

  
  openClientForm(user: UserModel): void {

    // Populate the form with the selected user's data
    this.clientForm.patchValue({
      firstName: user.fullName.split(' ')[0] || '',
      lastName: user.fullName.split(' ')[1] || '',
      email: user.email,
      userId: user.userId,
      isActive: user.isActive
    });
    this.showClientForm = true;
  }

  closeClientForm(): void {
    this.showClientForm = false;
  }

  submitClientForm(): void {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      
      // Enable the userId field before submitting
      this.clientForm.get('userId')?.enable();
  
      const clientData = this.clientForm.value;
  
      this.adminService.createClient(clientData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.loadUsers();  // Reload user list
          this.showClientForm = false;  // Close form on success
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error submitting form:', error.message, error.error);
        }
      });
    }
  }
  
  
}



