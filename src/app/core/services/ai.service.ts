import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  analyzeSymptoms(symptoms: string[], patientAge?: number, patientGender?: string): Observable<SymptomAnalysis> {
    const payload = {
      symptoms,
      patientAge,
      patientGender,
      model: 'gpt-4',
      temperature: 0.3
    };
    
    return this.http.post<SymptomAnalysis>(`${this.apiUrl}/ai/analyze-symptoms`, payload);
  }

  generateHealthInsights(healthData: any): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/ai/health-insights`, { healthData });
  }
}