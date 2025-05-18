import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../../models/task.model';
import { ManagerService } from '../../../services/manager.service';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  taskId: number | null = null;
  task: TaskModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = Number(params.get('id'));
      if (this.taskId) {
        this.getTaskDetails(this.taskId);
      }
    });
  }

  getTaskDetails(taskId: number): void {
    this.managerService.getTaskById(taskId).subscribe(
      (data: TaskModel) => {
        this.task = data;
      },
      (error) => {
        console.error('Error fetching task details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/manager/list-all-tasks']);
  }
}
