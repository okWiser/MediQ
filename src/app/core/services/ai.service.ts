import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SymptomAnalysis {
  symptoms: string[];
  possibleConditions: string[];
  severity: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  disclaimer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private openaiUrl = 'https://api.openai.com/v1';

  constructor(private http: HttpClient) {}

  analyzeSymptoms(symptoms: string[], patientAge?: number, patientGender?: string): Observable<SymptomAnalysis> {
    // Mock analysis with realistic medical data
    const mockAnalysis: SymptomAnalysis = {
      symptoms,
      possibleConditions: this.generateMockConditions(symptoms),
      severity: this.calculateSeverity(symptoms),
      recommendations: this.generateRecommendations(symptoms),
      disclaimer: 'This is an AI-generated analysis for informational purposes only. Please consult with a healthcare professional for proper medical advice.'
    };
    
    return of(mockAnalysis);
  }

  generateHealthInsights(healthData: any): Observable<string[]> {
    const insights = [
      'Your blood pressure readings show improvement',
      'Consider increasing physical activity',
      'Medication adherence is excellent'
    ];
    return of(insights);
  }

  private generateMockConditions(symptoms: string[]): string[] {
    const conditionMap: {[key: string]: string[]} = {
      'fever': ['Viral infection', 'Bacterial infection', 'Flu'],
      'headache': ['Tension headache', 'Migraine', 'Dehydration'],
      'cough': ['Common cold', 'Bronchitis', 'Allergies'],
      'fatigue': ['Sleep deprivation', 'Anemia', 'Thyroid issues'],
      'chest pain': ['Muscle strain', 'Acid reflux', 'Anxiety']
    };
    
    const conditions = new Set<string>();
    symptoms.forEach(symptom => {
      const matches = conditionMap[symptom.toLowerCase()];
      if (matches) matches.forEach(condition => conditions.add(condition));
    });
    
    return Array.from(conditions).slice(0, 5);
  }

  private calculateSeverity(symptoms: string[]): 'low' | 'medium' | 'high' | 'emergency' {
    const emergencySymptoms = ['chest pain', 'shortness of breath'];
    const highSymptoms = ['fever', 'persistent cough', 'dizziness'];
    
    if (symptoms.some(s => emergencySymptoms.includes(s.toLowerCase()))) return 'emergency';
    if (symptoms.some(s => highSymptoms.includes(s.toLowerCase()))) return 'high';
    if (symptoms.length > 3) return 'medium';
    return 'low';
  }

  private generateRecommendations(symptoms: string[]): string[] {
    const recommendations = [
      'Stay hydrated and get adequate rest',
      'Monitor symptoms and track changes'
    ];
    
    if (symptoms.some(s => s.toLowerCase().includes('fever'))) {
      recommendations.push('Take temperature regularly');
    }
    
    if (symptoms.length > 2) {
      recommendations.push('Schedule appointment with healthcare provider');
    }
    
    return recommendations;
  }
}