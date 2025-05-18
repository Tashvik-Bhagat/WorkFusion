import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../models/admin.model';

@Component({
  selector: 'app-admin-profile-update',
  templateUrl: './admin-profile-update.component.html',
  styleUrls: ['./admin-profile-update.component.css']
})
export class AdminProfileUpdateComponent implements OnInit {
  adminForm: FormGroup;
  userId!: number;
  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.adminForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      adminImage: [null], // To store the image data
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Get userId from route params
      this.loadAdminData();
    });
  }

  loadAdminData(): void {
    this.adminService.getAdminsByUserId(this.userId).subscribe({
      next: (admin: Admin) => {
        this.adminForm.patchValue(admin);
        // Set the selected image as a data URL with prefix for displaying
        if (admin.adminImage) {
          this.selectedImage = 'data:image/png;base64,' + admin.adminImage;
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load admin data.', 'Error');
        console.error(err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string; // Store the data URL for displaying the image
        // Save the raw base64 string (without the 'data:image/png;base64,' prefix)
        this.adminForm.patchValue({
          adminImage: this.selectedImage!.split(',')[1] // Remove prefix before storing in form
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const updatedAdmin: Admin = { ...this.adminForm.value, userId: this.userId };
      this.adminService.updateAdmin(this.userId, updatedAdmin).subscribe({
        next: (response) => {
          // Check if the response is an object and contains the 'message' field
          if (response && response.message === "Admin updated successfully.") {
            this.toastr.success(response.message, 'Success');
          } else {
            this.toastr.error('Failed to update admin profile.', 'Error');
          }
          this.router.navigate(['/admin/admin-profile']);
        },
        error: (err) => {
          this.toastr.error('Failed to update admin profile.', 'Error');
          console.error(err);
        }
      });
    } else {
      this.adminForm.markAllAsTouched();
      this.toastr.error('Please fill in all required fields.', 'Validation Error');
    }
  }
   
}
