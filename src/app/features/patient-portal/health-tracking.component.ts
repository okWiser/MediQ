import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-health-tracking',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressBarModule, MatTabsModule],
  template: `
    <div class="dashboard-container">
      <h1>Health Tracking Dashboard</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>favorite</mat-icon>
            </div>
            <div class="metric-value">72</div>
            <div class="metric-label">Avg Heart Rate</div>
            <div class="metric-trend positive">↑ 2 bpm</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>monitor_weight</mat-icon>
            </div>
            <div class="metric-value">165</div>
            <div class="metric-label">Weight (lbs)</div>
            <div class="metric-trend negative">↓ 3 lbs</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>thermostat</mat-icon>
            </div>
            <div class="metric-value">120/80</div>
            <div class="metric-label">Blood Pressure</div>
            <div class="metric-trend stable">Stable</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>bedtime</mat-icon>
            </div>
            <div class="metric-value">7.2h</div>
            <div class="metric-label">Sleep Quality</div>
            <div class="metric-trend positive">↑ 0.5h</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="health-tabs">
        <mat-tab label="Vital Signs">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Recent Measurements</mat-card-title>
                <button mat-raised-button color="primary">Add Reading</button>
              </mat-card-header>
              <mat-card-content>
                <div class="vitals-list">
                  <div class="vital-item" *ngFor="let vital of vitalSigns">
                    <div class="vital-header">
                      <mat-icon [style.color]="vital.color">{{vital.icon}}</mat-icon>
                      <div class="vital-info">
                        <div class="vital-name">{{vital.name}}</div>
                        <div class="vital-time">{{vital.timestamp}}</div>
                      </div>
                      <div class="vital-value">
                        <span class="value">{{vital.value}}</span>
                        <span class="unit">{{vital.unit}}</span>
                      </div>
                    </div>
                    <div class="vital-status">
                      <mat-chip [class]="'status-' + vital.status">{{vital.statusText}}</mat-chip>
                      <div class="trend-indicator" [class]="vital.trend">
                        <mat-icon>{{getTrendIcon(vital.trend)}}</mat-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Health Goals</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="goals-list">
                  <div class="goal-item" *ngFor="let goal of healthGoals">
                    <div class="goal-header">
                      <mat-icon>{{goal.icon}}</mat-icon>
                      <div class="goal-info">
                        <div class="goal-name">{{goal.name}}</div>
                        <div class="goal-target">Target: {{goal.target}}</div>
                      </div>
                    </div>
                    <div class="goal-progress">
                      <mat-progress-bar [value]="goal.progress" [color]="goal.color"></mat-progress-bar>
                      <span class="progress-text">{{goal.current}} / {{goal.target}}</span>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Activity Tracking">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Daily Activity</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="activity-summary">
                  <div class="activity-item" *ngFor="let activity of dailyActivity">
                    <div class="activity-icon">
                      <mat-icon [style.color]="activity.color">{{activity.icon}}</mat-icon>
                    </div>
                    <div class="activity-details">
                      <div class="activity-name">{{activity.name}}</div>
                      <div class="activity-value">{{activity.value}} {{activity.unit}}</div>
                      <div class="activity-goal">Goal: {{activity.goal}} {{activity.unit}}</div>
                    </div>
                    <div class="activity-progress">
                      <mat-progress-bar [value]="activity.percentage" [color]="activity.color"></mat-progress-bar>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Wellness Insights</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="insights-list">
                  <div class="insight-item" *ngFor="let insight of wellnessInsights">
                    <div class="insight-icon">
                      <mat-icon [style.color]="insight.color">{{insight.icon}}</mat-icon>
                    </div>
                    <div class="insight-content">
                      <div class="insight-title">{{insight.title}}</div>
                      <div class="insight-description">{{insight.description}}</div>
                      <div class="insight-recommendation">{{insight.recommendation}}</div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .health-tabs { margin-top: 24px; }
    .metric-icon { text-align: center; margin-bottom: 8px; }
    .metric-icon mat-icon { font-size: 32px; width: 32px; height: 32px; color: var(--premium-accent); }
    .metric-trend { font-size: 12px; font-weight: 600; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    .stable { color: #6b7280; }
    
    .vitals-list, .goals-list { display: flex; flex-direction: column; gap: 16px; }
    .vital-item, .goal-item { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .vital-header, .goal-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .vital-info, .goal-info { flex: 1; }
    .vital-name, .goal-name { font-weight: 600; }
    .vital-time, .goal-target { font-size: 12px; color: var(--premium-text-muted); }
    .vital-value { text-align: right; }
    .value { font-size: 18px; font-weight: 700; color: var(--premium-accent); }
    .unit { font-size: 12px; color: var(--premium-text-muted); }
    .vital-status { display: flex; justify-content: space-between; align-items: center; }
    .trend-indicator { display: flex; align-items: center; }
    .trend-indicator.up { color: #10b981; }
    .trend-indicator.down { color: #ef4444; }
    .trend-indicator.stable { color: #6b7280; }
    
    .goal-progress { display: flex; align-items: center; gap: 12px; }
    .progress-text { font-size: 12px; color: var(--premium-text-muted); }
    
    .activity-summary { display: flex; flex-direction: column; gap: 16px; }
    .activity-item { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .activity-icon mat-icon { font-size: 24px; width: 24px; height: 24px; }
    .activity-details { flex: 1; }
    .activity-name { font-weight: 600; }
    .activity-value { font-size: 18px; font-weight: 700; color: var(--premium-accent); }
    .activity-goal { font-size: 12px; color: var(--premium-text-muted); }
    .activity-progress { width: 100px; }
    
    .insights-list { display: flex; flex-direction: column; gap: 16px; }
    .insight-item { display: flex; gap: 16px; padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .insight-icon mat-icon { font-size: 24px; width: 24px; height: 24px; }
    .insight-title { font-weight: 600; margin-bottom: 4px; }
    .insight-description { font-size: 14px; margin-bottom: 8px; }
    .insight-recommendation { font-size: 12px; color: var(--premium-accent); font-style: italic; }
  `]
})
export class HealthTrackingComponent implements OnInit {
  vitalSigns = [
    {
      name: 'Blood Pressure',
      value: '118/76',
      unit: 'mmHg',
      timestamp: '2 hours ago',
      status: 'normal',
      statusText: 'Normal',
      trend: 'stable',
      icon: 'monitor_heart',
      color: '#10b981'
    },
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      timestamp: '2 hours ago',
      status: 'normal',
      statusText: 'Normal',
      trend: 'up',
      icon: 'favorite',
      color: '#ef4444'
    },
    {
      name: 'Blood Glucose',
      value: '95',
      unit: 'mg/dL',
      timestamp: '4 hours ago',
      status: 'normal',
      statusText: 'Normal',
      trend: 'down',
      icon: 'water_drop',
      color: '#3b82f6'
    },
    {
      name: 'Oxygen Saturation',
      value: '98',
      unit: '%',
      timestamp: '6 hours ago',
      status: 'normal',
      statusText: 'Excellent',
      trend: 'stable',
      icon: 'air',
      color: '#06b6d4'
    }
  ];

  healthGoals = [
    {
      name: 'Weight Loss',
      target: '160 lbs',
      current: '165',
      progress: 75,
      color: 'primary',
      icon: 'monitor_weight'
    },
    {
      name: 'Daily Steps',
      target: '10,000',
      current: '8,500',
      progress: 85,
      color: 'accent',
      icon: 'directions_walk'
    },
    {
      name: 'Sleep Quality',
      target: '8 hours',
      current: '7.2',
      progress: 90,
      color: 'primary',
      icon: 'bedtime'
    },
    {
      name: 'Water Intake',
      target: '8 glasses',
      current: '6',
      progress: 75,
      color: 'accent',
      icon: 'local_drink'
    }
  ];

  dailyActivity = [
    {
      name: 'Steps',
      value: '8,547',
      unit: 'steps',
      goal: '10,000',
      percentage: 85,
      color: 'primary',
      icon: 'directions_walk'
    },
    {
      name: 'Calories Burned',
      value: '2,340',
      unit: 'cal',
      goal: '2,500',
      percentage: 94,
      color: 'accent',
      icon: 'local_fire_department'
    },
    {
      name: 'Active Minutes',
      value: '45',
      unit: 'min',
      goal: '60',
      percentage: 75,
      color: 'warn',
      icon: 'timer'
    },
    {
      name: 'Distance',
      value: '4.2',
      unit: 'miles',
      goal: '5.0',
      percentage: 84,
      color: 'primary',
      icon: 'straighten'
    }
  ];

  wellnessInsights = [
    {
      title: 'Excellent Blood Pressure Control',
      description: 'Your blood pressure readings have been consistently in the normal range.',
      recommendation: 'Continue your current medication regimen and lifestyle habits.',
      icon: 'thumb_up',
      color: '#10b981'
    },
    {
      title: 'Improve Sleep Consistency',
      description: 'Your sleep duration varies significantly between weekdays and weekends.',
      recommendation: 'Try to maintain a consistent sleep schedule, even on weekends.',
      icon: 'schedule',
      color: '#f59e0b'
    },
    {
      title: 'Hydration Goal Achievement',
      description: 'You\'ve been meeting your daily water intake goals consistently.',
      recommendation: 'Keep up the great work! Proper hydration supports overall health.',
      icon: 'water_drop',
      color: '#3b82f6'
    }
  ];

  ngOnInit() {}

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }
}