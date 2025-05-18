import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';  
import { LeaveModel } from '../../../models/Leave.model'; 
import { Router } from '@angular/router';  
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrl: './pending-leaves.component.css'
})
export class PendingLeavesComponent  implements OnInit {
  // Array to hold the pending leave requests
  pendingLeaves: LeaveModel[] = [];
  filteredLeaves: LeaveModel[] = [];
  managerId: number | null = null;  // Initially set to null
  searchQuery: string = '';  // Search term

  constructor(private leaveService: ManagerService, private router: Router) { }

  ngOnInit(): void {
    this.managerId = this.getManagerIdFromLocalStorage();
    if (this.managerId !== null) {
      this.loadPendingLeaves();
    } else {
      console.error('Manager not logged in');
    }
  }

  getManagerIdFromLocalStorage(): number | null {
    const managerId = localStorage.getItem('EntityId');
    return managerId ? +managerId : null;
  }

  loadPendingLeaves(): void {
    if (this.managerId !== null) {
      this.leaveService.getPendingLeaves(this.managerId).subscribe(
        (leaves: LeaveModel[]) => {
          this.pendingLeaves = leaves;
          this.filteredLeaves = [...this.pendingLeaves];  // Initialize filtered list
        },
        (error) => {
          console.error('Error fetching pending leaves', error);
        }
      );
    }
  }

  approveLeave(leaveId: number): void {
    if (this.managerId !== null && leaveId !== undefined) {
      this.leaveService.approveLeaveRequest(leaveId, this.managerId).subscribe(
        (response: any) => {
          console.log(response.message);
          this.pendingLeaves = this.pendingLeaves.filter(leave => leave.id !== leaveId);
          this.filteredLeaves = [...this.pendingLeaves];  // Update filtered list
        },
        (error: HttpErrorResponse) => {
          console.error('Error approving leave request:', error);
        }
      );
    }
  }

  rejectLeave(leaveId: number): void {
    if (this.managerId !== null) {
      this.leaveService.rejectLeaveRequest(leaveId, this.managerId).subscribe(
        (response: any) => {
          this.pendingLeaves = this.pendingLeaves.filter(leave => leave.id !== leaveId);
          this.filteredLeaves = [...this.pendingLeaves];  // Update filtered list
          console.log('Leave rejected:', response.message);
        },
        (error: HttpErrorResponse) => {
          console.error('Error rejecting leave request:', error);
        }
      );
    }
  }

  // Filter the leaves based on search term
  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLeaves = this.pendingLeaves.filter(
      (leave: LeaveModel) =>
        leave.employeeName.toLowerCase().includes(query) || // Replace with relevant fields
        leave.leaveType.toLowerCase().includes(query) // Example: add more filters as needed
    );
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredLeaves = [...this.pendingLeaves];  // Reset to original leaves
    console.log("Search reset");
  }

  // Navigation methods for approved and rejected leaves
  navigateToApprovedLeaves(): void {
    this.router.navigate(['/manager/approved-leaves']);  
  }

  navigateToRejectedLeaves(): void {
    this.router.navigate(['/manager/rejected-leaves']);
  }
}
