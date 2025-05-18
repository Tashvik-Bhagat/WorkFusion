import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup; // Form group to hold the form structure
  isSubmitting = false; // Flag for submit button status

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,private snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  // Method to submit the form
  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.isSubmitting = true;
      this.adminService.addDepartment(this.departmentForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Department added successfully!', 'Close', { duration: 3000 });
          this.departmentForm.reset();
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error adding department:', error);
          this.snackBar.open('Failed to add department. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
}
