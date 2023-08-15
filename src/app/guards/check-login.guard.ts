import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class CheckLoginGuard implements CanActivate {

  constructor(private authService: AuthService){}

  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged: boolean)=> !isLogged)
    );
  }

}
