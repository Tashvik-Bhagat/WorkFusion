import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../services/admin.service';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent implements OnInit{
  updateClientForm: FormGroup;
  clientId: number | undefined;
  selectedImage: File | null = null;
  
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.updateClientForm = this.fb.group({
      clientId: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      isActive: [{ value: '', disabled: true }], // Make sure this is provided correctly in the backend
      gender: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clientId = +idParam;
    }

    if (this.clientId !== undefined) {
      this.adminService.getClientById(this.clientId).subscribe(
        (client: ClientModel) => {
          this.updateClientForm.patchValue({
            clientId: client.clientId,
            userId: client.userId,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phone: client.phone,
            presentAddress: client.presentAddress,
            permanentAddress: client.permanentAddress,
            isActive: client.isActive ? 'Active' : 'Inactive', // Adjust based on backend expected type
            gender: client.gender,
            idType: client.idType,
            idNumber: client.idNumber,
            Image: client.clientImage,
          });
        },
        error => {
          console.error('Error fetching manager:', error);
          this.toastr.error('Failed to load manager details');
        }
      );
    }
  }

  onSubmit(): void {
    if (this.updateClientForm.valid) {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.updateClientForm.get('clientId')?.enable();

        const updatedData: ClientModel = {
          ...this.updateClientForm.getRawValue(),
          isActive: this.updateClientForm.get('isActive')?.value === 'Active'
        };
        if (this.selectedImage) {
          this.convertImageToBase64(this.selectedImage).then(base64 => {
            updatedData.clientImage = base64;
            this.updateClient(updatedData);
          });
        } else {
          this.updateClient(updatedData);
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

  updateClient(data: ClientModel): void {
    this.adminService.updateClient(data).subscribe(
      () => {
        this.toastr.success('Client updated successfully');
        this.router.navigate(['admin/client/list-client']);
      },
      error => {
        console.error('Error updating client:', error);
        this.toastr.error('Failed to update client');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['admin/client/list-client']);
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

}
