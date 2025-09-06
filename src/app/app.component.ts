import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './core/store';
import { selectIsAuthenticated, selectUserRole } from './core/store/auth/auth.selectors';
import { AuthActions } from './core/store/auth/auth.actions';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MediQ';
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  isDarkTheme$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private themeService: ThemeService
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userRole$ = this.store.select(selectUserRole);
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
