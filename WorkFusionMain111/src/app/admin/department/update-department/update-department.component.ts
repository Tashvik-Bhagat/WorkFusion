import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  departmentId: number = 0; // Initialize with default value
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    public router: Router, // Router set to public for HTML access
    private toastr: ToastrService
  ) {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Ensure route parameter is a number before assignment
    this.departmentId = +this.route.snapshot.params['departmentId'] || 0;
    if (this.departmentId) this.loadDepartmentDetails();
  }

  loadDepartmentDetails(): void {
    this.isLoading = true;
    this.adminService.getDepartmentById(this.departmentId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.departmentForm.patchValue({
          departmentName: data.departmentName,
          description: data.description
        });
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Failed to load department details');
      }
    });
  }

  updateDepartment(): void {
    if (this.departmentForm.invalid) return;

    const updatedData = { departmentId: this.departmentId, ...this.departmentForm.value };
    this.isLoading = true;

    this.adminService.updateDepartment(updatedData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Department updated successfully');
        this.router.navigate(['admin/department/list-department']);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Failed to update department');
      }
    });
  }
}
