import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
  totalProjects = 0;
  inProgressProjects = 0;
  completedProjects = 0;
  onHoldProjects = 0;

  chartData: any[] = [];
  categoryAxis: any;
  seriesGroups: any[] = [];  // Initialize with an empty array

  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    // Retrieve managerId (EntityId) from local storage
    const managerId = localStorage.getItem('EntityId') 
      ? parseInt(localStorage.getItem('EntityId')!, 10) 
      : 0; // Default to 0 if not found

    // Fetch project status counts
    this.managerService.getProjectStatusCounts(managerId).subscribe((data) => {
      this.totalProjects = data.totalProjects;
      this.inProgressProjects = data.inProgressProjects;
      this.completedProjects = data.completedProjects;
      this.onHoldProjects = data.onHoldProjects;

      // Format data for jqxChart
      this.chartData = [
        { category: 'In Progress', value: this.inProgressProjects },
        { category: 'Completed', value: this.completedProjects },
        { category: 'On Hold', value: this.onHoldProjects },
      ];

      // Configure category axis
      this.categoryAxis = {
        textField: 'category',
        dataField: 'category',
        gridLines: { visible: true },
        axisSize: 'auto',
        tickMarks: { visible: true },
      };

      // Configure series groups (set chart type and data fields)
      this.seriesGroups = [
        {
          type: 'column',
          series: [
            {
              dataField: 'value',
              displayText: 'category',
              labelRadius: 0.15,
              initialAngle: 15,
              radius: 0.8,
              opacity: 0.7,
              lineWidth: 5,
            }
          ]
        }
      ];
      
      console.log('Chart Data:', this.chartData); // Log the chart data
    });
  }
}
