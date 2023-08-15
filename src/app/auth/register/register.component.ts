import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide = true;
  public registerForm!: FormGroup;

  constructor(

    private authService: AuthService,
    private fb:          FormBuilder,
    private roter:       Router,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {

    this.registerForm = this.fb.group({

      userName:    ['', Validators.required],
      pwd:         ['', Validators.required],
      pwd2:        ['', Validators.required],
      nombre:      ['', Validators.required],
      apellido:    ['', Validators.required],
      direccion:   ['', Validators.required],

    });
  }

  sendUser() {
    const user = this.registerForm.value;

    this.authService.sendUser(user).subscribe(
      resultado => {
        //console.log('REGISTRADO',resultado);

      },
    );

    //console.log(this.registerForm.value);

    this.snackBar.open('USUARIO CREADO', '',{
      duration: 3000,
      horizontalPosition: 'center',
    });

    this.registerForm.reset();
  }

  /////snackBar para mostrar un mensaje de producto eliminado, se debe importar en el constructor
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
  return this.snackBar.open(message, action, {
    duration: 2000,
  });
}

}
