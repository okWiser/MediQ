import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/store';
import { verifyTwoFactor } from '../../../core/store/auth/auth.actions';
import { selectAuthLoading } from '../../../core/store/auth/auth.selectors';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {
  twoFactorForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.twoFactorForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.loading$ = this.store.select(selectAuthLoading);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.twoFactorForm.valid) {
      const code = this.twoFactorForm.get('code')?.value;
      this.store.dispatch(verifyTwoFactor({ code }));
    }
  }

  onResendCode(): void {
    console.log('Resending 2FA code...');
  }
}
