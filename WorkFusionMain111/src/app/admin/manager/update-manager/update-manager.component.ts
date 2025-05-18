import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../services/admin.service';
import { ManagerModel } from '../../../models/manager.model';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit {
  updateManagerForm: FormGroup;
  managerId: number | undefined;
  selectedImage: File | null = null;
  departments: any[] = [];  // To store department data

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.updateManagerForm = this.fb.group({
      managerId: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', Validators.required],
      isActive: [{ value: '', disabled: true }], // Make sure this is provided correctly in the backend
      gender: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      hireDate: ['', Validators.required], // Add this field here 
      dateOfBirth :  ['', Validators.required],  
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.managerId = +idParam;
    }

    if (this.managerId !== undefined) {
      this.adminService.getManagerById(this.managerId).subscribe(
        (manager: ManagerModel) => {
          this.updateManagerForm.patchValue({
            managerId: manager.managerId,
            userId: manager.userId,
            firstName: manager.firstName,
            lastName: manager.lastName,
            email: manager.email,
            phone: manager.phone,
            presentAddress: manager.presentAddress,
            permanentAddress: manager.permanentAddress,
            departmentId: manager.departmentId,
            salary: manager.salary,
            isActive: manager.isActive ? 'Active' : 'Inactive', // Adjust based on backend expected type
            hireDate: manager.hireDate,
            gender: manager.gender,
            idType: manager.idType,
            idNumber: manager.idNumber,
            managerImage: manager.managerImage,
            dateOfBirth:manager.dateOfBirth,
          });
        },
        error => {
          console.error('Error fetching manager:', error);
          this.toastr.error('Failed to load manager details');
        }
      );
    }
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
    

  onSubmit(): void {
    if (this.updateManagerForm.valid) {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.updateManagerForm.get('managerId')?.enable();

        const updatedData: ManagerModel = {
          ...this.updateManagerForm.getRawValue(),
          isActive: this.updateManagerForm.get('isActive')?.value === 'Active'
        };
        if (this.selectedImage) {
          this.convertImageToBase64(this.selectedImage).then(base64 => {
            updatedData.managerImage = base64;
            this.updateManager(updatedData);
          });
        } else {
          this.updateManager(updatedData);
        }
      }, 3000);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
    }
  }

  updateManager(data: ManagerModel): void {
    this.adminService.updateManager(data).subscribe(
      () => {
        this.toastr.success('Manager updated successfully');
        this.router.navigate(['admin/manager/list-manager']);
      },
      error => {
        console.error('Error updating manager:', error);
        this.toastr.error('Failed to update manager');
      }
    );
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        resolve(base64String);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  }
  

  goBack(): void {
    this.router.navigate(['admin/manager/list-manager']);
  }
}
