import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  destroy$: Subject<void> = new Subject<void>();
  logoutSubject: Subject<boolean> = new Subject<boolean>();

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,

    //private badgeService: BadgeService,
  ){}

  ngOnInit(): void {
    this.logoutSubject.pipe(takeUntil(this.destroy$)).subscribe(() => {
    });
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  setUserRole(userRole: string | null): void {
    this.userRoleSubject.next(userRole);
  }

  //LOGOUT
  logout(): void {
    this.setUserRole(null);
    this.authService.logout();
    
    //this.logoutSubject.next(true);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
