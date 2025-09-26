export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  medicalLicense?: string;
  specialization?: string;
  department?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  stats: UserStats;
}

export interface UserStats {
  experience: string;
  patients: string;
  rating: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}