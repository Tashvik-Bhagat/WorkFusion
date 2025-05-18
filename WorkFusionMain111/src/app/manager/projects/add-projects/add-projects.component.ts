import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../../services/manager.service';
import { Router } from '@angular/router';
import { ClientsProjectRequestsModel } from '../../../models/clientProjectRequests.model';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {
  addProjectForm!: FormGroup;
  selectedFile: File | null = null;
  clientId: number | null = null;
  selectedTeamMemberIds: number[] = [];
  teamMembers: { id: number; fullName: string; employeeImage?: string }[] = []; // Added `employeeImage?`
  // Dynamically fetched team members
  teamMembersVisible: boolean = false; // New flag to toggle team member visibility

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTeamMembers(); // Fetch dynamic team members
    this.getProjectData(); // Prefill project data

    const managerId = localStorage.getItem('EntityId');
    if (managerId) {
      this.addProjectForm.patchValue({ managerId });
    }
  }

  toggleTeamMembers(): void {
    this.teamMembersVisible = !this.teamMembersVisible;
  }

  initializeForm(): void {
    this.addProjectForm = this.fb.group({
      clientId: ['', Validators.required],
      managerId: ['', Validators.required],
      projectName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      deadline: ['', Validators.required],
      actualCost: ['', [Validators.required, Validators.min(0)]],
      teamMembers: [[], Validators.required],
      milestones: ['', Validators.required],
      isActive: ['', Validators.required],
      attachments: [null]
    });
  }

  loadTeamMembers(): void {
    const managerId = localStorage.getItem('EntityId');
    if (managerId) {
      this.managerService.getEmployeesByManagerId(Number(managerId)).subscribe(
        (members) => {
          this.teamMembers = members.map((member: any) => ({
            id: member.employeeId,
            fullName: `${member.firstName} ${member.lastName}`,
            employeeImage: `data:image/jpeg;base64,${member.employeeImage}`
          }));
        },
        (error) => {
          console.error('Error fetching team members:', error);
        }
      );
    }
  }
  
  getProjectData(): void {
    const managerId = localStorage.getItem('EntityId');
    if (managerId) {
      this.managerService.getProjectRequestsManager(Number(managerId)).subscribe(
        (response: ClientsProjectRequestsModel[]) => {
          if (response && response.length > 0) {
            const project = response[0];
            this.addProjectForm.patchValue({
              clientId: project.clientID,
              projectName: project.projectTitle,
              description: project.projectDescription,
              budget: project.budget,
              status: project.isActive,
              deadline: project.deadline,
              isActive: project.isActive,
              attachments: project.attachments
            });
            this.clientId = project.clientID;
          }
        },
        (error) => {
          console.error('Error fetching project data:', error);
        }
      );
    }
  }

  onTeamMemberSelectionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const memberId = Number(input.value);
    if (input.checked) {
      this.selectedTeamMemberIds.push(memberId);
    } else {
      this.selectedTeamMemberIds = this.selectedTeamMemberIds.filter((id) => id !== memberId);
    }
    this.addProjectForm.patchValue({
      teamMembers: this.selectedTeamMemberIds
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
      this.convertFileToBase64(this.selectedFile);
    }
  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addProjectForm.patchValue({
        attachments: reader.result
      });
    };
  }

  goBack(): void {
    this.router.navigate(['/manager/projects-requests']);
  }

  onSubmit(): void {
    if (this.addProjectForm.invalid) {
      console.log("Form is invalid");
      return; // Stop execution if form is invalid
    }
  
    // Convert the selected team member IDs to a comma-separated string
    const teamMembersString = this.selectedTeamMemberIds.join(',');  // Join array into a string
  
    // Prepare the project object with the converted teamMembers as a string
    const project = { ...this.addProjectForm.value, teamMembers: teamMembersString };
  
    // Call the createProject method of the service with project data and Base64 file
    this.managerService.createProject(project).subscribe(
      (response: any) => {
        console.log('Project created successfully!', response);
        alert('Project created successfully!');
        
        // Reset the form after successful submission
        this.addProjectForm.reset();
      },
      (error: any) => {
        console.error('Error creating project:', error);
        // Optionally, show an error message
      }
    );
  }
  
}
