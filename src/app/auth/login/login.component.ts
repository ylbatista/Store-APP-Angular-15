import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;

  loginForm = this.fb.group({
    userName: [''],
    pwd: [''],
  });

  constructor(
    private authService: AuthService,
    private fb:          FormBuilder,
    private router:           Router,
    private snackBar:    MatSnackBar,

  ) {}

  ngOnChanges(): void {
    const userData = {
      userName:"",
      pwd: "",
    };

    this.authService.login(userData).subscribe((respuesta) => console.log('login'));
  }

  onLogin(): void {
    const formValue = this.loginForm.value;

    this.authService.setUserRole('ADMIN');

    this.authService.login({userName: formValue.userName ?? '', pwd: formValue.pwd ?? '',}
      ).subscribe({
        next: (respuesta: any) => {
          if(respuesta) {
            if (respuesta.rol =='ADMIN'){
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/pages/list']);
            }
          }
          console.log('USUARIO LOGADO CORRECTAMENTE', respuesta);


          this.snackBar.open('USUARIO LOGADO CORRECTAMENTE', '',{
            duration: 3000,
            horizontalPosition: 'center',
          });
        },

        error: (e) => {
          //console.warn('Error al logarse', e);
          if (e.status === 400, 401) {
            // Contraseña incorrecta o usuario no registrado
            this.snackBar.open('CONTRASEñA INCORRECTA O USUARIO NO REGISTRADO', '',{
              duration: 5000,
              horizontalPosition: 'center',
              panelClass: 'error',
            });
          } else {
             // Otro tipo de error
              console.warn('Error al logarse', e);
              // Realizar acciones adicionales según el error
            }
        },

        complete: () => {
          console.info('complete')
        },
      });

  }

  /////snackBar para mostrar un mensaje de producto eliminado, se debe importar en el constructor
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
