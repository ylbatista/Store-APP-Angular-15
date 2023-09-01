import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';

import { AuthService } from 'src/app/auth/auth.service';
import { AllUsers } from 'src/app/interfaces/user.interface';

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

  // users: AllUsers [] = [];
  user: string = '';


  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    //private router: Router,
    //private badgeService: BadgeService,
  ){ }

  ngOnInit(): void {

    this.authService.userNameLogged$.subscribe(name => {
      this.userNameLogged = name;
    });

    this.logoutSubject.pipe(takeUntil(this.destroy$)).subscribe(() => {
    });



    // this.adminService.getAllUser().subscribe(resp => {
    //   console.log(resp);

    // });



  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  setUserRole(userRole: string): void {
    this.userRoleSubject.next(userRole);
  }

  //LOGOUT
  logout(): void {
    this.setUserRole('');
    this.authService.logout();
    this.logoutSubject.next(true);
  }


  //debo obtenerel usuario
  //ENVIAR DATA DEL USUARIO en user-list A USERS-EDIT
  // editUser(user: any): void {
  //   this.router.navigate(['/admin/users-edit'], { state: { user } });
  //   console.log(user);

  // }

  getUserById(user: any): void {
    // this.adminService.getUserById(user).subscribe(resp => {
    //   console.log(resp);
    //   this.user = resp;
    // })
  }

}
