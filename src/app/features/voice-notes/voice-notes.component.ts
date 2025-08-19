import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SpeechService, VoiceNote } from '../../core/services/speech.service';
import { NotificationService } from '../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voice-notes',
  templateUrl: './voice-notes.component.html',
  styleUrls: ['./voice-notes.component.scss']
})
export class VoiceNotesComponent implements OnInit, OnDestroy {
  @Input() patientId: string = '';
  
  isRecording = false;
  transcription = '';
  voiceNotes: VoiceNote[] = [];
  private transcriptionSub?: Subscription;
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];

  constructor(
    private speechService: SpeechService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.transcriptionSub = this.speechService.transcription$.subscribe(
      text => this.transcription = text
    );
  }

  ngOnDestroy(): void {
    this.transcriptionSub?.unsubscribe();
    this.stopRecording();
  }

  async startRecording(): Promise<void> {
    if (!this.speechService.isRecognitionSupported()) {
      this.notificationService.showError('Speech recognition not supported in this browser');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.saveVoiceNote(audioBlob);
      };

      this.mediaRecorder.start();
      this.speechService.startListening();
      this.isRecording = true;
      this.speechService.clearTranscription();
    } catch (error) {
      this.notificationService.showError('Failed to access microphone');
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.speechService.stopListening();
      this.isRecording = false;
      
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }

  private saveVoiceNote(audioBlob: Blob): void {
    const voiceNote: VoiceNote = {
      id: crypto.randomUUID(),
      patientId: this.patientId,
      doctorId: 'current-doctor-id', // Get from auth service
      audioBlob,
      transcription: this.transcription,
      timestamp: new Date(),
      duration: 0 // Calculate from audio
    };

    this.voiceNotes.unshift(voiceNote);
    this.notificationService.showSuccess('Voice note saved successfully');
  }

  playAudio(note: VoiceNote): void {
    if (note.audioBlob) {
      const audio = new Audio(URL.createObjectURL(note.audioBlob));
      audio.play();
    }
  }

  deleteNote(noteId: string): void {
    this.voiceNotes = this.voiceNotes.filter(note => note.id !== noteId);
    this.notificationService.showSuccess('Voice note deleted');
  }
}