import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { LeaveModel } from '../../models/Leave.model';

@Component({
  selector: 'app-employee-leave-requests',
  templateUrl: './employee-leave-requests.component.html',
  styleUrl: './employee-leave-requests.component.css'
})
export class EmployeeLeaveRequestsComponent implements OnInit {
  isModalOpen = false;
  leaveRequests: LeaveModel[] = [];
  errorMessage: string = '';
  leaveForm: FormGroup = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl('Pending', Validators.required), // Set status to 'Pending'
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchLeaveRequests();
  }

  fetchLeaveRequests() {
    const employeeId = localStorage.getItem('EntityId');
    if (employeeId) {
      this.employeeService.getLeavesByEmployeeId(Number(employeeId)).subscribe({
        next: (data: LeaveModel[]) => {
          console.log('Fetched leave requests:', data);
          this.leaveRequests = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        },
        error: (err) => {
          console.error('Error fetching leave requests:', err);
          this.errorMessage = 'Failed to fetch leave requests. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Employee ID not found. Please log in again.';
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    const employeeId = localStorage.getItem('EntityId');
  
    if (this.leaveForm.valid) {
      console.log('Leave application submitted:', this.leaveForm.value);
      const leaveRequest = { ...this.leaveForm.value, EmployeeId: employeeId };
  
      this.employeeService.submitLeaveRequest(leaveRequest).subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Leave applied successfully');
            this.closeModal();
            this.fetchLeaveRequests();
  
            // Clear the form data
            this.leaveForm.reset();
            this.leaveForm.patchValue({ status: 'Pending' }); // Set default value for 'status'
          } else {
            this.errorMessage = 'Failed to submit leave request. Please try again.';
          }
        },
        error: (err: any) => {
          console.error('Error submitting leave request:', err);
          this.errorMessage = 'Failed to submit leave request. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
  
}