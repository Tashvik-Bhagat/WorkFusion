import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

interface DepartmentProjectStatusCountsModel {
  departmentName: string;
  totalProjects: number;
  inProgressProjects: number;
  completedProjects: number;
  onHoldProjects: number;
}

@Component({
  selector: 'app-departments-projects',
  templateUrl: './departments-projects.component.html',
  styleUrls: ['./departments-projects.component.css']
})
export class DepartmentsProjectsComponent implements OnInit {
  departmentStatusData: DepartmentProjectStatusCountsModel[] = [];
  chartData: any[] = [];
  categoryAxis: any;
  seriesGroups: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDepartmentProjectStatusCounts().subscribe(
      (data: DepartmentProjectStatusCountsModel[]) => {
        this.departmentStatusData = data;
        console.log('Department Data:', data); // Check if data is fetched
  
        // Prepare chart data and configurations for each department
        this.chartData = data.map((department: DepartmentProjectStatusCountsModel) => ({
          category: department.departmentName,
          inProgress: department.inProgressProjects,
          completed: department.completedProjects,
          onHold: department.onHoldProjects,
        }));
        console.log('Chart Data:', this.chartData); // Check if chartData is populated
  
        this.categoryAxis = {
          dataField: 'category', // Matches the 'category' field in your chartData
          showGridLines: true,
        };
        
        this.seriesGroups = [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 5,
            valueAxis: {
              description: 'Projects',
              axisSize: 'auto',
              unitInterval: 1, // Ensure steps of 1
              gridLines: { visible: true },
              minValue: 0, // Start at 0
              maxValue: Math.ceil(
                Math.max(...this.chartData.flatMap((item) => [item.inProgress, item.completed, item.onHold]))
              ), // Dynamically set maximum value
              labels: {
                formatFunction: (value: number) => value.toFixed(0), // Display only integers
              },
            },
            series: [
              { dataField: 'inProgress', displayText: 'In Progress' },
              { dataField: 'completed', displayText: 'Completed' },
              { dataField: 'onHold', displayText: 'On Hold' },
            ],
          },
        ];
        
      },
      (error) => {
        console.error('Error fetching department project status counts:', error);
      }
    );
  }
  
  getChartDataForDepartment(departmentName: string) {
    const departmentData = this.chartData.find(item => item.category === departmentName);
    return departmentData ? [departmentData] : []; // Return as an array
  }
  
  getDynamicColorScheme(index: number): string {
    const colorSchemes = ["scheme01", "scheme02", "scheme03", "scheme04", "scheme05"];
    return colorSchemes[index % colorSchemes.length];
  }
}
