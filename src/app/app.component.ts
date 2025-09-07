import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AppState } from './core/store';
import { selectIsAuthenticated, selectUserRole } from './core/store/auth/auth.selectors';
import { AuthActions } from './core/store/auth/auth.actions';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MediQ';
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  isDarkTheme$: Observable<boolean>;
  canGoBack = false;

  constructor(
    private store: Store<AppState>,
    private themeService: ThemeService,
    private location: Location,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userRole$ = this.store.select(selectUserRole);
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.canGoBack = !['/', '/login', '/patient-dashboard', '/doctor-dashboard', '/admin-dashboard'].includes(event.url);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
