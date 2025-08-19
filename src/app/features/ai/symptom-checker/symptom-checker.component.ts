import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AiService, SymptomAnalysis } from '../../../core/services/ai.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  styleUrls: ['./symptom-checker.component.scss']
})
export class SymptomCheckerComponent implements OnInit {
  symptomForm: FormGroup;
  analysis: SymptomAnalysis | null = null;
  isAnalyzing = false;
  
  commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Chest pain', 'Shortness of breath', 'Abdominal pain', 'Joint pain'
  ];

  constructor(
    private fb: FormBuilder,
    private aiService: AiService,
    private notificationService: NotificationService
  ) {
    this.symptomForm = this.fb.group({
      symptoms: this.fb.array([], Validators.required),
      age: ['', [Validators.min(1), Validators.max(120)]],
      gender: ['']
    });
  }

  ngOnInit(): void {}

  get symptomsArray(): FormArray {
    return this.symptomForm.get('symptoms') as FormArray;
  }

  addSymptom(symptom: string): void {
    if (!this.symptomsArray.value.includes(symptom)) {
      this.symptomsArray.push(this.fb.control(symptom));
    }
  }

  removeSymptom(index: number): void {
    this.symptomsArray.removeAt(index);
  }

  analyzeSymptoms(): void {
    if (this.symptomForm.valid && this.symptomsArray.length > 0) {
      this.isAnalyzing = true;
      const { symptoms, age, gender } = this.symptomForm.value;
      
      this.aiService.analyzeSymptoms(symptoms, age, gender).subscribe({
        next: (analysis) => {
          this.analysis = analysis;
          this.isAnalyzing = false;
        },
        error: (error) => {
          this.notificationService.showError('Failed to analyze symptoms. Please try again.');
          this.isAnalyzing = false;
        }
      });
    }
  }

  getSeverityColor(severity: string): string {
    const colors = {
      low: '#28a745',
      medium: '#ffc107', 
      high: '#fd7e14',
      emergency: '#dc3545'
    };
    return colors[severity as keyof typeof colors] || '#6c757d';
  }
}