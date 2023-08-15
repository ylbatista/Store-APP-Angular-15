import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent {

  editForm!: FormGroup;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private adminSvc: AdminService,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    const user = history.state.user;
    this.userId = user.id;
    console.log(user);

    this.editForm = this.fb.group({
      //id: [user.id, Validators.required],
      // pwd: [user.pwd, Validators.required],
      nombre: [user.nombre, Validators.required],
      apellido: [user.apellido, Validators.required],
      direccion:[user.direccion, Validators.required],
      rol: [user.rol],
      //userName: [user.userName, Validators.required]

    });
  }

  ///ME SUBSCRIBO AL SERVICIO PARA ACTUALIZAR LOS DATOS
  updateUser(): void {

    const updatedUser = this.editForm.value;
    this.adminSvc.updateUser(this.userId, updatedUser).subscribe({
      next: (response: any) => {
        console.log('USER ACT. CORRECTAMENTE', response);

        this.snackBar.open('USUARIO EDITADO CORRECTAMENTE', '',{
          duration: 3000,
          horizontalPosition: 'center',
        });

        this.editForm.reset();
      },
      error: (e) => {
        console.warn('ERROR AL ACT. USER', e);
      },

      complete: () => {
        console.info('COMPLETE')
      },
    });
  }

  /////snackBar para mostrar un mensaje de usuario editado, se debe importar en el constructor
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
