import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  totalProjects = 0;
  inProgressProjects = 0;
  completedProjects = 0;
  onHoldProjects = 0;

  chartData: any[] = [];
  categoryAxis: any;
  seriesGroups: any[] = []; // Initialize with an empty array

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Fetch project status counts from the AdminService
    this.adminService.getProjectStatusCounts().subscribe(
      (data) => {
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

        // Configure category axis for the chart
        this.categoryAxis = {
          textField: 'category',
          dataField: 'category',
          gridLines: { visible: true },
          axisSize: 'auto',
          tickMarks: { visible: true },
        };

        // Define a custom color scheme
        const customColors = ['#4caf50', '#2196f3', '#ff9800']; // Green, Blue, Orange

        // Configure series groups for the chart
        this.seriesGroups = [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 5,
            valueAxis: {
              description: 'Projects',
              unitInterval: 1, // Steps of 1 for the Y-axis
              minValue: 0, // Start at 0
              maxValue: Math.ceil(
                Math.max(...this.chartData.map((item) => item.value))
              ), // Dynamically calculate maximum value
              labels: {
                formatFunction: (value: number) => value.toFixed(0), // Display only integers
              },
            },
            series: [
              {
                dataField: 'value',
                displayText: 'Project Status',
                colorFunction: (value: number, itemIndex: number) =>
                  customColors[itemIndex % customColors.length],
                opacity: 0.7,
                lineWidth: 2,
              },
            ],
          },
        ];
      },
      (error) => {
        console.error('Error fetching project status counts:', error);
      }
    );
  }
}
