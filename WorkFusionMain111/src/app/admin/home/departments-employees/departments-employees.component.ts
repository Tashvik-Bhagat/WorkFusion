import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-departments-employees',
  templateUrl: './departments-employees.component.html',
  styleUrls: ['./departments-employees.component.css']
})
export class DepartmentsEmployeesComponent implements OnInit {
  chartData: any[] = [];
  categoryAxis: any;
  seriesGroups: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Fetch active employee counts by department
    this.adminService.getActiveEmployeeCountsByDepartment().subscribe(
      (data) => {
        // Format data for the chart
        this.chartData = data.map((item: any) => ({
          departmentName: item.departmentName.trim(), // Remove extra spaces
          activeEmployees: item.activeEmployeeCount
        }));

        // Configure category axis for the charts
        this.categoryAxis = {
          dataField: 'departmentName', // Match with mapped data field
          gridLines: { visible: true },
          axisSize: 'auto',
          tickMarks: { visible: true },
        };

        // Define a custom color array for column charts
        const columnColors = [
          '#FF5733', // Red
          '#33FF57', // Green
          '#3357FF', // Blue
          '#FF33A1', // Pink
          '#FF8C00', // Orange
          '#8A2BE2', // Blue Violet
          '#D2691E', // Chocolate
          '#B22222', // Firebrick
          '#32CD32', // Lime Green
          '#FF6347', // Tomato
        ];

        // Configure series groups for the charts (column and pie chart)
        this.seriesGroups = [
          {
            type: 'column',
            valueAxis: {
              minValue: 0, // Minimum value of the axis
              maxValue: Math.ceil(
                Math.max(...this.chartData.map((item) => item.activeEmployees))
              ), // Maximum value dynamically based on data
              unitInterval: 1, // Set step to integers
              gridLines: { visible: true },
              labels: { formatFunction: (value: number) => value.toFixed(0) }, // Force integer formatting
            },
            series: [
              {
                dataField: 'activeEmployees',
                displayText: 'Active Employees',
                colorFunction: (value: number, index: number) =>
                  columnColors[index % columnColors.length], // Cycle through the color array
              },
            ],
          },
          {
            type: 'pie',
            series: [
              {
                dataField: 'activeEmployees',
                displayText: 'departmentName', // Display department names in the legend
                labelRadius: 0.4,
                initialAngle: 15,
                radius: 100,
                formatSettings: { suffix: ' employees' }, // Show employee count as suffix
                colorFunction: (value: number, index: number) =>
                  this.getColorForPieChart(index),
              },
            ],
          },
        ];
      },
      (error) => {
        console.error('Error fetching active employee counts by department:', error);
      }
    );
  }

  // Color function for the pie chart
  getColorForPieChart(index: number): string {
    const colors = [
      '#FF5733', // Red
      '#33FF57', // Green
      '#3357FF', // Blue
      '#FF33A1', // Pink
      '#FF8C00', // Orange
      '#8A2BE2', // Blue Violet
      '#D2691E', // Chocolate
      '#B22222', // Firebrick
      '#32CD32', // Lime Green
      '#FF6347', // Tomato
    ];
    return colors[index % colors.length]; // Cycle through colors
  }
}
