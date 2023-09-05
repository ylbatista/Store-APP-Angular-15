import { Component, ViewChild } from '@angular/core';
import { AllUsers } from 'src/app/interfaces/user.interface';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: AllUsers [] = [];

  displayedColumns: string[] = ['id', 'userName', 'nombre', 'apellido', 'direccion', 'rol','actions'];
  dataSource: MatTableDataSource<AllUsers>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){
    this.dataSource = new MatTableDataSource<AllUsers>(this.users),
    this.route.params.subscribe(params => this.applyFilter(params['event']));
    this.dataSource.sort = this.sort;
  }

  //ME SUBSCRIBO AL OBSERVABLE DEL ADMIN SERVICE PARA RECIBIR EL ARREGLO DE USUARIOS
  ngOnInit(): void {
   this.adminService.getAllUser().subscribe(
    (data: AllUsers[]) => {
      this.users = data;
      this.dataSource.data = this.users;
      console.log('DATOS DE USERS RECIBIDOS', this.users);
    },
    (error) => {
      // Aquí manejas cualquier error que ocurra durante la solicitud
      console.error('Error al obtener los usuarios:', error);
    }
   );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //ME SUBSCRIBO AL OBSERVABLE DEL ADMIN SERVICE PARA ELIMINAR userById
  deleteUser(id: string): void {
    this.adminService.deleteUserById(id).subscribe(() => {
      this.users = this.users.filter((users) => users.id !== id);

      //llamo denuevo al dataSource.data para actualizar
      this.dataSource.data = this.users;

      /////snackBar para mostrar un mensaje de usuario eliminado, se debe importar en el constructor
      this.snackBar.open('Usuario eliminado con exito', id,{
        duration: 3000,
        horizontalPosition: 'center',
      })
    },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  } 

  ///////FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //ENVIAR DATA DEL USUARIO en user-list A USERS-EDIT
  editUser(user: any): void {
    this.router.navigate(['/admin/users-edit'], { state: { user } });
  }

}
