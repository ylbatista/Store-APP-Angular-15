import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/admin.service';
import { AllUsers } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-cards-user',
  templateUrl: './cards-user.component.html',
  styleUrls: ['./cards-user.component.scss']
})
export class CardsUserComponent {


  // contactsData:Contact[];
  users: AllUsers [] = [];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,

  ) {

    this.users;
  }

  //ME SUBSCRIBO AL OBSERVABLE DEL ADMIN SERVICE PARA RECIBIR EL ARREGLO DE USUARIOS
  ngOnInit(): void {
    this.adminService.getAllUser().subscribe(
     (data: AllUsers[]) => {
       this.users = data;
      //  this.dataSource.data = this.users;
       console.log('DATOS DE USERS RECIBIDOS', this.users);
     },
     (error) => {
       // Aquí manejas cualquier error que ocurra durante la solicitud
       console.error('Error al obtener los usuarios:', error);
     }
    );

  }

  //ME SUBSCRIBO AL OBSERVABLE DEL ADMIN SERVICE PARA ELIMINAR userById
  deleteUser(id: string): void {
    this.adminService.deleteUserById(id).subscribe(() => {
      this.users = this.users.filter((users) => users.id !== id);

      /////snackBar para mostrar un mensaje de usuario eliminado, se debe importar en el constructor
      this.snackBar.open('Usuario eliminado con exito', '',{
        duration: 3000,
        horizontalPosition: 'center',
      })
    },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

}
