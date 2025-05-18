import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-projects',
  templateUrl: './update-projects.component.html',
  styleUrl: './update-projects.component.css'
})
export class UpdateProjectsComponent {
  updateProjectForm!: FormGroup; // Reactive Form
  projectId: string | null = null; // To store projectId from route
  selectedTeamMemberIds: number[] = [];
  teamMembers: { id: number; fullName: string; employeeImage?: string }[] = []; // Added `employeeImage?`
  // Dynamically fetched team members
  teamMembersVisible: boolean = false; // New flag to toggle team member visibility



  constructor(
    private fb: FormBuilder,        // For building reactive form
    private route: ActivatedRoute,  // To get route parameters
    private managerService: ManagerService, // Service for API calls
    private router: Router,
    private toastr: ToastrService // Inject ToastrService       // To navigate between routes
  ) {}

  ngOnInit(): void {
    // Initialize form with default values
    this.updateProjectForm = this.fb.group({
      projectId: [{ value: '', }, Validators.required],
      clientId: [{ value: '', }, Validators.required],
      managerId: [{ value: '',  }, Validators.required],
      projectName: ['', Validators.required],
      description: ['',],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      clientFirstName:['',Validators.required],
      clientLastName:['',Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      deadline: ['', Validators.required],
      actualCost: ['', Validators.required],
      teamMembers: ['', Validators.required],
      milestones: ['', Validators.required],
      attachments: [null], // Will store file data if any
      isActive: [true, Validators.required], // Assuming this is a boolean
    });
    this.loadTeamMembers(); // Fetch dynamic team members
    // Get the projectId from route params and fetch the project data
    this.projectId = this.route.snapshot.paramMap.get('id'); // Assuming route is like '/projects/update/:id'
    if (this.projectId) {
      this.fetchProjectData(+this.projectId); // Convert projectId to number
    }
  }

  // Fetch project data using service and prefill the form
  fetchProjectData(projectId: number): void {
    this.managerService.getProjectById(projectId).subscribe(
      (data: any) => {
        if (data && typeof data === 'object') {
          console.log('Fetched Project Data:', data);
          this.updateProjectForm.patchValue({
            projectId: data.projectId ?? '',
            clientId: data.clientId ?? '',
            managerId: data.managerId ?? '',
            createdAt: data.createdAt ?? '',
            updatedAt: data.updatedAt ?? '',
            projectName: data.projectName ?? '',
            description: data.description ?? '',
            startDate: data.startDate ?? '',
            endDate: data.endDate ?? '',
            budget: data.budget ?? '',
            status: data.status ?? '',
            deadline: data.deadline ?? '',
            clientFirstName: data.clientFirstName ??'',
            clientLastName:data.clientLastName ??'',
            actualCost: data.actualCost ?? '',
            teamMembers: data.teamMembers ?? '',
            milestones: data.milestones ?? '',
            attachments: data.attachments ?? '', // Assuming attachments could be a string or file data
            isActive: data.isActive ?? true,
          });
        } else {
          console.error('Unexpected response structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }
  
  toggleTeamMembers(): void {
    this.teamMembersVisible = !this.teamMembersVisible;
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

  onFileSelect(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create FileReader instance
  
      // Convert the file to a Base64 string
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result as string; // Get the Base64 string
  
        // Assign the Base64 string directly to the form control
        this.updateProjectForm.patchValue({ attachments: base64File });
        this.updateProjectForm.get('attachments')?.updateValueAndValidity(); // Trigger validation
  
        console.log(base64File); // Log Base64 string for debugging (optional)
      };
  
      // Handle potential errors
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }
  goBack() {
    this.router.navigate(['/manager/list-all-projects']);
  }

  onTeamMemberSelectionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const memberId = Number(input.value);
    if (input.checked) {
      this.selectedTeamMemberIds.push(memberId);
    } else {
      this.selectedTeamMemberIds = this.selectedTeamMemberIds.filter((id) => id !== memberId);
    }
    this.updateProjectForm.patchValue({
      teamMembers: this.selectedTeamMemberIds
    });
  }

  
  onSubmit(): void {
    if (this.updateProjectForm.valid && this.projectId) {
      // Prepare the project object with selected team members as a string
      const teamMembersString = this.selectedTeamMemberIds.join(',');  // Join array into a string
      const project = { ...this.updateProjectForm.value, teamMembers: teamMembersString };
  
      // Send the correctly formatted data to backend
      console.log('Project Data:', project);
      this.managerService.updateProject(+this.projectId, project).subscribe(
        (response) => {
          this.toastr.success('Project updated successfully!', 'Success'); // Show success toaster
          this.router.navigate(['/manager/list-all-projects']); // Navigate back to projects list
        },
        (error) => {
          console.error('Error updating project:', error);
          this.toastr.error('Failed to update project. Please try again.', 'Error');
        }
      );
    }
  } 
}