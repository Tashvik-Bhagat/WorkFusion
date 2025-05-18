export interface TaskModel {
    taskId: number;
    taskName: string;
    description: string;
    assignedTo: number;
    assignedBy:number;
    projectId: number;
    priority: string;
    status: string;
    startDate: string; // Date as ISO string (e.g., "2024-12-18T00:00:00Z")
    dueDate: string;
    endDate?: string; // Optional
    createdAt: string;
    updatedAt: string;
    isActive: boolean;

    // Additional fields
  employeeName?: string; // Name of the assigned employee
  projectName?: string; // Name of the project
  }
  
  export interface TaskStatusModel {
    taskId: number;
    status: string;
    startDate: string; 
    endDate?: string; // Optional
  }

  export interface TaskCountModel {
    pending: number;
    completed: number;
    workingOnIt: number;
    total: number;
  }