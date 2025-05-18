
export interface UserModel {
  userId: number;        // Add userId
    username: string;
    fullName: string;
    email: string;
    passwordHash: string;  
    roleId: number;        
    isActive: boolean;     // Add isActive
  }
  