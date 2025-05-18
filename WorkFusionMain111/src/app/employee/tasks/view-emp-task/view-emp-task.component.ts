import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../../models/task.model';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-view-emp-task',
  templateUrl: './view-emp-task.component.html',
  styleUrl: './view-emp-task.component.css'
})
export class ViewEmpTaskComponent implements OnInit {
  taskId: number | null = null;
  task: TaskModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
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
    this.employeeService.getTaskById(taskId).subscribe(
      (data: TaskModel) => {
        this.task = data;
      },
      (error) => {
        console.error('Error fetching task details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employee/list-all-emp-tasks']);
  }
}
