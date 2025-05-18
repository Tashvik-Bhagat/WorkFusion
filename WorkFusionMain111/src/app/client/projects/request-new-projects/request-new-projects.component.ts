import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ClientsProjectRequestsModel } from '../../../models/clientProjectRequests.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-new-projects',
  templateUrl: './request-new-projects.component.html',
  styleUrls: ['./request-new-projects.component.css'],
})
export class RequestNewProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projectTypes: string[] = [];
  uploadedFiles: { fileName: string; fileType: string; fileBase64: string }[] = [];
  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.projectForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectType: ['', Validators.required],
      objectives: ['', Validators.required],
      keyDeliverables: ['', Validators.required],
      budget: [null, [Validators.required, Validators.min(0)]],
      preferredStartDate: ['', Validators.required],
      deadline: ['', Validators.required],
      targetAudience: ['', Validators.required],
      designPreferences: ['', Validators.required],
      functionalRequirements: ['', Validators.required],
      technologyPreferences: ['', Validators.required],
      challengesToAddress: ['', Validators.required],
      competitorReferences: ['', Validators.required],
      specialInstructions: [''],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  /**
   * Fetches department names from the backend and updates the projectTypes array.
   */
  loadDepartments(): void {
    this.clientService.getDepartments().subscribe({
      next: (response) => {
        this.projectTypes = response.map((department: any) => department.departmentName);
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      },
    });
  }

  /**
   * Handles file uploads, validates size and type, and converts files to Base64.
   */
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

  /**
   * Submits the project form and sends data to the backend.
   */
  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject: ClientsProjectRequestsModel = {
        ...this.projectForm.value,
        attachments: this.uploadedFiles.map((file) => file.fileBase64).join(','), // Convert to comma-separated Base64
        projectID: 0,
        clientID: this.getClientId(),
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        managerNotes: '',
      };

      this.clientService.createProjectRequest(newProject).subscribe({
        next: () => {
          alert('Project request created successfully!');
          this.projectForm.reset();
          this.uploadedFiles = [];
        },
        error: (err) => {
          console.error('Error creating project request:', err);
        },
      });
    }
  }

  /**
   * Fetches the client ID from the stored JWT token.
   */
  getClientId(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.EntityId || 0;
    }
    return 0;
  }

  onCancel(): void {
    this.router.navigate(['/client/request-projects']);
  }
}
