import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; // Import spinner service

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  updateEmployeeForm: FormGroup;
  employeeId: number | undefined;
  selectedImage: File | null = null;
  departments: any[] = [];  // To store department data

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService, // ToastrService for notifications
    private spinner: NgxSpinnerService // NgxSpinnerService for spinner
  ) {
    this.updateEmployeeForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hireDate: ['', Validators.required],
      departmentId: ['', Validators.required],
      currentSalary: ['', Validators.required],
      isActive: [{ value: '', disabled: true }],
      createdAt: [{ value: '', disabled: true }],
      updatedAt: [{ value: new Date(), disabled: true }],
      employeeImage: [''],
      gender: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.employeeId = +idParam;
    }

    if (this.employeeId !== undefined) {
      this.adminService.getEmployeeById(this.employeeId).subscribe(employee => {
        this.updateEmployeeForm.patchValue({
          employeeId: employee.employeeId,
          userId: employee.userId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          presentAddress: employee.presentAddress,
          permanentAddress: employee.permanentAddress,
          dateOfBirth: employee.dateOfBirth,
          hireDate: employee.hireDate,
          departmentId: employee.departmentId,
          currentSalary: employee.currentSalary,
          isActive: employee.isActive ? 'Active' : 'Inactive',
          createdAt: employee.createdAt,
          updatedAt: new Date(),
          employeeImage: employee.employeeImage,
          gender: employee.gender,
          idType: employee.idType,
          idNumber: employee.idNumber
        });
      });
    }
  }

  onSubmit(): void {
    if (this.updateEmployeeForm.valid) {
      this.spinner.show(); // Show the spinner
      setTimeout(() => {
        this.spinner.hide(); // Hide spinner after 3 seconds

        // Enable employeeId field for submission
        this.updateEmployeeForm.get('employeeId')?.enable();

        const updatedData = {
          ...this.updateEmployeeForm.value,
          updatedAt: new Date()
        };

        if (this.selectedImage) {
          this.convertImageToBase64(this.selectedImage).then(base64 => {
            updatedData.employeeImage = base64;
            this.updateEmployee(updatedData);
          });
        } else {
          this.updateEmployee(updatedData);
        }
      }, 3000);
    }
  }

  updateEmployee(data: any): void {
    this.adminService.updateEmployee(data).subscribe(
      () => {
        this.toastr.success('Employee updated successfully');
        this.router.navigate(['admin/employee/list-employee']);
      },
      error => {
        console.error('Error updating employee:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
    }
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
  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  }

  

  goBack(): void {
    this.router.navigate(['admin/employee/list-employee']);
  }
}
