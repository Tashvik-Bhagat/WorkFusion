import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { TaskCountModel } from '../../models/task.model';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeehomeComponent implements OnInit {
  taskStatus: TaskCountModel = {
    pending: 0,
    completed: 0,
    workingOnIt: 0,
    total: 0
  };

  chartData: any[] = [];
  seriesGroups: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    const employeeId = localStorage.getItem('EntityId') 
      ? parseInt(localStorage.getItem('EntityId')!, 10) 
      : 0; // Default to 0 if not found

    this.employeeService.getTaskCountsByEmployeeId(employeeId).subscribe((data) => {
      this.taskStatus = data;

      // Prepare chart data
      this.chartData = [
        { category: 'Pending', value: this.taskStatus.pending },
        { category: 'Working On It', value: this.taskStatus.workingOnIt },
        { category: 'Completed', value: this.taskStatus.completed },
      ];

      // Configure Pie Chart properties
      this.seriesGroups = [
        {
          type: 'pie', 
          series: [
            {
              dataField: 'value',
              displayText: 'category',
              labelRadius: 0.15,
              initialAngle: 15,
              unitInterval: 1, // Set step to integers
              radius: 100,
              opacity: 0.7,
              lineWidth: 5,
              colorScheme: 'scheme05'  // Choose a color scheme for better visibility
            }
          ]
        }
      ];
    });
  }
}
