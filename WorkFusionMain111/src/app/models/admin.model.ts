export interface Admin {
  adminId: number;
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
  adminImage: string; // Base64-encoded string for the image
  userId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
