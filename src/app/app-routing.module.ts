import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomCheckerComponent } from './features/ai/symptom-checker/symptom-checker.component';
import { VoiceNotesComponent } from './features/voice-notes/voice-notes.component';
import { SmartSchedulingComponent } from './features/smart-scheduling/smart-scheduling.component';

const routes: Routes = [
  { path: '', redirectTo: '/symptom-checker', pathMatch: 'full' },
  { path: 'symptom-checker', component: SymptomCheckerComponent },
  { path: 'voice-notes', component: VoiceNotesComponent },
  { path: 'smart-scheduling', component: SmartSchedulingComponent },
  { path: '**', redirectTo: '/symptom-checker' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }