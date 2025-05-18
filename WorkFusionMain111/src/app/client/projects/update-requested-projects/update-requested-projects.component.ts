import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsProjectRequestsModel } from '../../../models/clientProjectRequests.model';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-requested-projects',
  templateUrl: './update-requested-projects.component.html',
  styleUrls: ['./update-requested-projects.component.css'],
})
export class UpdateRequestedProjectsComponent implements OnInit {
  updateForm: FormGroup;
  projectRequestID: number | null = null;
  uploadedFiles: { fileName: string; fileType: string; fileBase64: string }[] = [];
  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      projectTitle: ['', [Validators.required, Validators.maxLength(100)]],
      projectType: ['', Validators.required],
      objectives: [''],
      keyDeliverables: [''],
      budget: ['', [Validators.required, Validators.min(0)]],
      preferredStartDate: ['', Validators.required],
      deadline: ['', Validators.required],
      projectDescription: [''],
      targetAudience: [''],
      designPreferences: [''],
      functionalRequirements: [''],
      technologyPreferences: [''],
      challengesToAddress: [''],
      competitorReferences: [''],
      specialInstructions: [''],
      managerNotes: [''],
    });
  }

  ngOnInit(): void {
    this.projectRequestID = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectRequestID) {
      this.fetchProjectDetails(this.projectRequestID);
    } else {
      Swal.fire('Error!', 'Invalid project ID!', 'error');
      this.router.navigate(['/client/request-projects']);
    }
  }

  fetchProjectDetails(projectRequestID: number): void {
    this.clientService.getProjectRequestById(projectRequestID).subscribe({
      next: (project) => {
        this.updateForm.patchValue(project);
      },
      error: (err) => {
        console.error('Error fetching project details:', err);
        Swal.fire('Error!', 'Unable to fetch project details.', 'error');
        this.router.navigate(['/client/request-projects']);
      },
    });
  }

  handleFileUpload(event: any): void {
    const files: File[] = Array.from(event.target.files);

    files.forEach((file) => {
      if (file.size > this.maxFileSize) {
        alert(`File "${file.name}" exceeds the size limit of 5MB.`);
        return;
      }

      if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
        alert(`File "${file.name}" is not a valid type (only PNG, JPEG, PDF allowed).`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFiles.push({
          fileName: file.name,
          fileType: file.type,
          fileBase64: e.target.result.split(',')[1], // Extract Base64
        });
      };
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.projectRequestID) {
      const updatedProject: ClientsProjectRequestsModel = {
        ...this.updateForm.value,
        attachments: this.uploadedFiles.map((file) => file.fileBase64).join(','), // Convert to comma-separated Base64
        projectRequestID: this.projectRequestID,
      };

      Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we update the project.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.clientService.updateProjectRequest(updatedProject).subscribe({
        next: () => {
          Swal.fire('Success!', 'Project updated successfully.', 'success');
          this.router.navigate(['/client/request-projects']);
        },
        error: (err) => {
          console.error('Error updating project:', err);
          Swal.fire('Error!', 'Failed to update the project.', 'error');
        },
      });
    } else {
      Swal.fire('Error!', 'Please fill in all required fields.', 'error');
    }
  }

  onCancel(): void {
    this.router.navigate(['/client/request-projects']);
  }
}
