export interface ProjectModel{
    projectId: number; 
    projectName: string;
    description: string; 
    startDate: Date; 
    endDate: Date; 
    budget: number; 
    status: string;
    clientFirstName:string;
    clientLastName:string;
    managerFirstName:string;
    managerLastName:string;
    clientId: number;
    updatedAt: Date; 
    managerId:number;
    deadline:Date;
    actualCost :number;
    attachments:string;
    milestones: string;
    teamMembers: string;
    teamMemberNames: string;
    isActive:boolean;
}