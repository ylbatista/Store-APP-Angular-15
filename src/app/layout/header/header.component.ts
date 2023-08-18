import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';

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

  userNameLogged: string | null = null;

  isLoggedIn$: boolean = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    //private router: Router,
    //private badgeService: BadgeService,
  ){
    //this.loggedUserName();
  }

  ngOnInit(): void {
    this.authService.userNameLogged$.subscribe(name => {
      this.userNameLogged = name;
    });

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

    this.logoutSubject.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }


}
