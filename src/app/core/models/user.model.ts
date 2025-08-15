export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  phoneNumber?: string;
  dateOfBirth?: string;
  avatar?: string;
  isEmailVerified: boolean;
  is2FAEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  role: UserRole.PATIENT;
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Doctor extends User {
  role: UserRole.DOCTOR;
  licenseNumber: string;
  specialization: string;
  yearsOfExperience: number;
  hospital?: string;
  consultationFee: number;
  rating: number;
  totalReviews: number;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  permissions: string[];
}
