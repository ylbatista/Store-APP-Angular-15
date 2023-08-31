import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  hide = true;

  loginForm = this.fb.group({
    userName: [''],
    pwd: [''],
    rememberMe: [false],
  });

  constructor(
    private authService: AuthService,
    private fb:          FormBuilder,
    private router:           Router,
    private snackBar:    MatSnackBar,

  ) {}

  ngOnChanges(): void {
    const userData: User = {
      userName:"",
      pwd: "",
      rememberMe: false,
    };

    this.authService.login(userData).subscribe((respuesta) => console.log('login'));
  }

  onLogin(): void {
    const formValue = this.loginForm.value;



    // Asegurarse de que userName y pwd no sean nulos ni indefinidos antes de usarlos
    const userName = formValue.userName!;
    const pwd = formValue.pwd!;

    const rememberMeValue = formValue.rememberMe !== null && formValue.rememberMe !== undefined ? formValue.rememberMe : false;

    this.authService.login({userName: formValue.userName ?? '', pwd: formValue.pwd ?? '', rememberMe: rememberMeValue}
      ).subscribe({
      next: (respuesta: any) => {

        if(respuesta){
          if(respuesta.rol == 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
            this.authService.setUserRole('ADMIN');

          } else {
            this.router.navigate(['/pages/list']);
            this.authService.setUserRole('USER');
          }
        }
        console.log('USUARIO LOGADO CORRECTAMENTE', respuesta);

        // if (formValue.rememberMe) {
        //   localStorage.setItem('rememberedUserName', userName);
        //   localStorage.setItem('rememberedPassword', pwd);
        // } else {
        //   localStorage.removeItem('rememberedUserName');
        //   localStorage.removeItem('rememberedPassword');
        // }

        this.snackBar.open('USUARIO LOGADO CORRECTAMENTE COMO', respuesta.name,{
          duration: 10000,
          // horizontalPosition: this.horizontalPosition,
          // verticalPosition: this.verticalPosition,
          horizontalPosition: 'center',
        });
      },

      error: (e) => {
        //console.warn('Error al logarse', e);
        if (e.status === 400, 401) {
          // Contraseña incorrecta o usuario no registrado
          this.snackBar.open('CONTRASEñA INCORRECTA O USUARIO NO REGISTRADO', 'ERROR',{
            // duration: 5000,
            horizontalPosition: 'center',
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
