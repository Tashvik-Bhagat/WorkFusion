import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager.service'; // Adjust the import path
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejected-leaves',
  templateUrl: './rejected-leaves.component.html',
  styleUrl: './rejected-leaves.component.css'
})
export class RejectedLeavesComponent implements OnInit {

  rejectedLeaves: any[] = [];
  managerId!: number;  

  constructor(
    private rejectedLeavesService: ManagerService,
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
      this.loadRejectedLeaves();
    } else {
      console.error('Manager ID not found in local storage');
    }
  }

  loadRejectedLeaves(): void {
    if (this.managerId) {
      this.rejectedLeavesService.getRejectedLeaves(this.managerId).subscribe(
        data => {
          this.rejectedLeaves = data;
        },
        error => {
          console.error('Error fetching rejected leaves:', error);
        }
      );
    } else {
      console.error('Manager ID is invalid');
    }
  }

  navigateToPendingLeaves(): void {
    this.router.navigate(['/manager/pending-leaves']); 
  }
}