import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ManagerModel } from '../../../models/manager.model';
import { ManagerService } from '../../../services/manager.service';


@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  manager: ManagerModel | null = null;

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchManagerData();
  }

  fetchManagerData(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.EntityId;

      this.managerService.getManagerById(userId).subscribe({
        next: (data) => (this.manager = data),
        error: (error) => console.error('Error fetching manager data', error)
      });
    }
  }

  navigateToUpdatePage(): void {
    if (this.manager) {
      this.router.navigate(['manager/manager-profile-update', this.manager.managerId]);
    }
  }
}
