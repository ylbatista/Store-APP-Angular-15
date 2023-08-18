import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  usernameEmail: string | null = null;

  userRolLogged: string | null = null;
  userNameLogged: string | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userNameLogged$.subscribe(name => {
      this.userNameLogged = name;
    })

    this.authService.userRolLogged$.subscribe(rol => {
      this.userRolLogged = rol;
    })

    this.authService.usernameUserLogged$.subscribe(username => {
      this.usernameEmail = username;
    })
  }

}
