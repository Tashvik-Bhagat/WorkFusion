import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';


@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  employeeId: number = 0;
  employeeDetails: any;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    // Get employee ID from route
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.employeeId) {
      this.fetchEmployeeDetails(this.employeeId);
    }
  }

  // Fetch employee details using the service
  fetchEmployeeDetails(id: number): void {
    this.managerService.getEmployeeById(id).subscribe(
      (data) => {
        this.employeeDetails = data;
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }
}
