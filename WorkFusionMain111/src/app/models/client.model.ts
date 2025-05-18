export class ClientModel {
    clientId!: number; // Corresponds to ClientId
    firstName!: string; // Corresponds to FirstName
    lastName!: string; // Corresponds to LastName
    gender!: string; // Corresponds to Gender
    email!: string; // Corresponds to Email
    phone!: string; // Corresponds to Phone
    presentAddress!: string; // Corresponds to PresentAddress
    permanentAddress!: string; // Corresponds to PermanentAddress
    idType!: string; // Corresponds to IDType
    idNumber!: string; // Corresponds to IDNumber
    dateOfBirth!: Date; // Corresponds to DateOfBirth
    userId!: number; // Corresponds to UserId
    clientImage?: string; // Corresponds to ClientImage (optional)
    isActive!: boolean; // Corresponds to IsActive
    createdAt!: Date; // Corresponds to CreatedAt
    updatedAt!: Date; // Corresponds to UpdatedAt
  }
  