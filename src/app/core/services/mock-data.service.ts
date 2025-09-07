import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getPatientAppointments(userId: string) {
    const appointments = {
      'p001': [
        { date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Smith', type: 'Annual Checkup', status: 'Confirmed' },
        { date: '2024-01-20', time: '2:30 PM', doctor: 'Dr. Michael Johnson', type: 'Follow-up', status: 'Pending' },
        { date: '2024-01-25', time: '9:15 AM', doctor: 'Dr. Emily Davis', type: 'Lab Results Review', status: 'Confirmed' }
      ]
    };
    return appointments[userId as keyof typeof appointments] || [];
  }

  getPatientMedicalRecords(userId: string) {
    const records = {
      'p001': [
        {
          title: 'Annual Physical Exam',
          date: '2024-01-10',
          doctor: 'Dr. Sarah Smith',
          diagnosis: 'Excellent Health',
          treatment: 'Continue current lifestyle, increase vitamin D',
          notes: 'Patient shows excellent vital signs. Blood pressure: 118/76, Heart rate: 68 bpm.'
        },
        {
          title: 'Blood Work - Comprehensive Panel',
          date: '2023-12-15',
          doctor: 'Dr. Michael Johnson',
          diagnosis: 'All markers within normal ranges',
          treatment: 'No treatment needed',
          notes: 'Complete blood count, lipid panel, and metabolic panel all within normal limits.'
        }
      ]
    };
    return records[userId as keyof typeof records] || [];
  }

  getDoctorPatients(userId: string) {
    const patients = {
      'd001': [
        { id: 'p001', name: 'John Patient', age: 38, lastVisit: '2024-01-10', condition: 'Healthy' },
        { id: 'p002', name: 'Jane Smith', age: 45, lastVisit: '2024-01-08', condition: 'Hypertension' },
        { id: 'p003', name: 'Bob Johnson', age: 62, lastVisit: '2024-01-05', condition: 'Diabetes Type 2' }
      ]
    };
    return patients[userId as keyof typeof patients] || [];
  }

  getDoctorSchedule(userId: string) {
    const schedule = {
      'd001': [
        { time: '9:00 AM', patient: 'John Patient', type: 'Follow-up', duration: '30 min' },
        { time: '10:00 AM', patient: 'Jane Smith', type: 'Consultation', duration: '45 min' },
        { time: '11:30 AM', patient: 'Bob Johnson', type: 'Check-up', duration: '30 min' },
        { time: '2:00 PM', patient: 'Mary Wilson', type: 'New Patient', duration: '60 min' }
      ]
    };
    return schedule[userId as keyof typeof schedule] || [];
  }

  getSystemUsers() {
    return [
      { id: 'p001', name: 'John Patient', email: 'patient@mediq.com', role: 'patient', status: 'Active' },
      { id: 'd001', name: 'Dr. Sarah Smith', email: 'doctor@mediq.com', role: 'doctor', status: 'Active' },
      { id: 'a001', name: 'Admin User', email: 'admin@mediq.com', role: 'admin', status: 'Active' },
      { id: 'p002', name: 'Jane Smith', email: 'jane@example.com', role: 'patient', status: 'Active' },
      { id: 'd002', name: 'Dr. Michael Johnson', email: 'mjohnson@mediq.com', role: 'doctor', status: 'Active' }
    ];
  }
}