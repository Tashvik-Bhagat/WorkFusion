export interface EmployeeModel {
  employeeId: number;
  firstName: string;
  lastName: string;
  gender: string;           // New field for Gender
  email: string;
  phone: string;
  presentAddress: string;
  permanentAddress: string;
  idType: string;           // New field for ID Type
  idNumber: string;         // New field for ID Number
  dateOfBirth: string;      // Can also use Date type, but match format from API
  departmentId: number;
  userId: number;
  hireDate: string;
  currentSalary: number;
  isActive: boolean;
  employeeImage?: string;
  createdAt: string;
  updatedAt: string;
}
