// src/app/models/manager.model.ts
export interface ManagerModel {
    managerId: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    presentAddress: string;
    permanentAddress: string;
    idType: string;
    idNumber: string;
    dateOfBirth: Date;
    departmentId: number;
    userId: number;
    hireDate: Date;
    salary: number;
    managerImage?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  