import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service'; // Adjust the import path
import { Router } from '@angular/router';
@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrl: './approved-leaves.component.css'
})
export class ApprovedLeavesComponent implements OnInit {

  approvedLeaves: any[] = [];
  managerId!: number;  

  constructor(
    private approvedLeavesService: ManagerService,
 private router: Router
  ) { }

  ngOnInit(): void {
    const storedManagerId = localStorage.getItem('EntityId');
    
    if (storedManagerId) {
      this.managerId = Number(storedManagerId); 
      if (isNaN(this.managerId)) {
        console.error('Manager ID is not a valid number');
        return;
      }
      this.loadApprovedLeaves();
    } else {
      console.error('Manager ID not found in local storage');
    }
  }

  loadApprovedLeaves(): void {
    if (this.managerId) {
      this.approvedLeavesService.getApprovedLeaves(this.managerId).subscribe(
        data => {
          this.approvedLeaves = data;
        },
        error => {
          console.error('Error fetching approved leaves:', error);
        }
      );
    } else {
      console.error('Manager ID is invalid');
    }
  }

  navigateToPendingLeaves() {
  this.router.navigate(['/manager/pending-leaves']); 
  }
}