import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SmartSchedulingService, SmartScheduleSuggestion, ScheduleOptimization } from '../../core/services/smart-scheduling.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-smart-scheduling',
  templateUrl: './smart-scheduling.component.html',
  styleUrls: ['./smart-scheduling.component.scss']
})
export class SmartSchedulingComponent implements OnInit {
  searchForm: FormGroup;
  suggestions: SmartScheduleSuggestion[] = [];
  optimization: ScheduleOptimization | null = null;
  isLoading = false;
  
  urgencyLevels = [
    { value: 'low', label: 'Routine' },
    { value: 'medium', label: 'Moderate' },
    { value: 'high', label: 'Urgent' },
    { value: 'emergency', label: 'Emergency' }
  ];

  constructor(
    private fb: FormBuilder,
    private smartSchedulingService: SmartSchedulingService,
    private notificationService: NotificationService
  ) {
    this.searchForm = this.fb.group({
      patientId: [''],
      symptoms: [''],
      urgency: ['medium'],
      preferredDate: [''],
      preferredTime: ['']
    });
  }

  ngOnInit(): void {}

  searchSuggestions(): void {
    if (this.searchForm.valid) {
      this.isLoading = true;
      const { patientId, symptoms, urgency } = this.searchForm.value;
      const symptomArray = symptoms ? symptoms.split(',').map((s: string) => s.trim()) : [];

      this.smartSchedulingService.getSuggestedAppointments(patientId, symptomArray, urgency)
        .subscribe({
          next: (suggestions) => {
            this.suggestions = suggestions;
            this.isLoading = false;
          },
          error: (error) => {
            this.notificationService.showError('Failed to get scheduling suggestions');
            this.isLoading = false;
          }
        });
    }
  }

  optimizeSchedule(doctorId: string): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.smartSchedulingService.optimizeDoctorSchedule(doctorId, today)
      .subscribe({
        next: (optimization) => {
          this.optimization = optimization;
          this.notificationService.showSuccess('Schedule optimization completed');
        },
        error: (error) => {
          this.notificationService.showError('Failed to optimize schedule');
        }
      });
  }

  bookAppointment(suggestion: SmartScheduleSuggestion, slot: any): void {
    // Implementation for booking appointment
    this.notificationService.showSuccess(`Appointment booked with ${suggestion.doctorName}`);
  }

  getMatchScoreColor(score: number): string {
    if (score >= 90) return '#28a745';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  }

  getPriorityColor(priority: string): string {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[priority as keyof typeof colors] || '#6c757d';
  }
}