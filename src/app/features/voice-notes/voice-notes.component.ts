import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-voice-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  template: `
    <div class="voice-notes-container">
      <h1>Voice Notes</h1>
      <p class="welcome-text">{{currentUser?.name}}, record and manage your health voice notes</p>
      
      <mat-card class="recording-card">
        <mat-card-header>
          <mat-icon mat-card-avatar [color]="isRecording ? 'warn' : 'primary'">
            {{isRecording ? 'stop' : 'mic'}}
          </mat-icon>
          <mat-card-title>{{isRecording ? 'Recording...' : 'Voice Recorder'}}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p *ngIf="!isRecording">Click the button below to start recording your voice note</p>
          <p *ngIf="isRecording" class="recording-status">Recording in progress... {{recordingTime}}s</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button 
                  [color]="isRecording ? 'warn' : 'primary'" 
                  (click)="toggleRecording()">
            <mat-icon>{{isRecording ? 'stop' : 'mic'}}</mat-icon>
            {{isRecording ? 'Stop Recording' : 'Start Recording'}}
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="notes-list-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>list</mat-icon>
          <mat-card-title>Your Voice Notes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let note of voiceNotes">
              <mat-icon matListItemIcon>audiotrack</mat-icon>
              <div matListItemTitle>{{note.title}}</div>
              <div matListItemLine>{{note.date}} - {{note.duration}}</div>
              <button mat-icon-button (click)="playNote(note)">
                <mat-icon>play_arrow</mat-icon>
              </button>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .voice-notes-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .welcome-text {
      color: #666;
      margin-bottom: 24px;
    }
    .recording-card, .notes-list-card {
      margin-bottom: 24px;
    }
    .recording-status {
      color: #f44336;
      font-weight: 500;
    }
  `]
})
export class VoiceNotesComponent implements OnInit {
  currentUser: User | null = null;
  isRecording = false;
  recordingTime = 0;
  voiceNotes: any[] = [];

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.voiceNotes = this.mockDataService.getVoiceNotes(this.currentUser.id);
    }
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  private startRecording() {
    this.recordingTime = 0;
    const interval = setInterval(() => {
      this.recordingTime++;
      if (!this.isRecording) {
        clearInterval(interval);
      }
    }, 1000);
  }

  private stopRecording() {
    // Mock saving the recording
    const newNote = {
      title: `Voice Note ${this.voiceNotes.length + 1}`,
      date: new Date().toLocaleDateString(),
      duration: `${Math.floor(this.recordingTime / 60)}:${(this.recordingTime % 60).toString().padStart(2, '0')}`
    };
    this.voiceNotes.unshift(newNote);
  }

  playNote(note: any) {
    console.log('Playing note:', note.title);
  }
}