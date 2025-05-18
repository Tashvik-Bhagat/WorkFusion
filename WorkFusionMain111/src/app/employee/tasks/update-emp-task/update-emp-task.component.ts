import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { TaskStatusModel } from '../../../models/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-emp-task',
  templateUrl: './update-emp-task.component.html',
  styleUrls: ['./update-emp-task.component.css'],
})
export class UpdateEmpTaskComponent implements OnInit {
  updateTaskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
     private toastr: ToastrService // Inject ToastrService 
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateTaskForm = this.fb.group({
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''], // Optional
    });

    this.loadTaskData();
  }

  loadTaskData(): void {
    this.employeeService.getTaskById(this.taskId).subscribe((task) => {
      this.updateTaskForm.patchValue({
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate,
      });
    });
  }

  onSubmit(): void {
    if (this.updateTaskForm.valid) {
      const updatedTask: TaskStatusModel = {
        taskId: this.taskId,
        ...this.updateTaskForm.value,
      };

      this.employeeService.updateTaskStatus(updatedTask).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.success('Task updated successfully!', 'Success'); // Show success toaster
            this.router.navigate(['/employee/list-all-emp-tasks']); // Redirect to the task list
          }
        },
        (error) => {
          this.toastr.error('Failed to update Tasks. Please try again.', 'Error');
        }
      );
    }
  }
}
