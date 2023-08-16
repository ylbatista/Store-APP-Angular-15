import { Component, ViewChild } from '@angular/core';
import { OrdersService } from '../orders.service';
import { AuthService } from 'src/app/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Orders } from 'src/app/interfaces/orders.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { AllUsers } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllOrdersComponent {
  months: string[] = ['Todas','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = [2023, 2024, 2025];
  users: string [] = [];

  selectedMonth: string = this.months[0]; // Inicializar en Todas
  selectedYear: number = this.years[0]; // Inicializar con el primer año
  selectedUser: string = this.users[0]; // Inicializar en Todos

  allOrders: Orders[] = [];
  dataSource!: MatTableDataSource<Orders>;

  columnsToDisplay = ['Id Orden', 'Creada por', 'Fecha de Creación', 'Total', 'Acciones'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Orders;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  /*Hago peticion de todos los usuarios para agregar el arreglo de los usuarios
  para sacar la propiedad nombre al filtro y asignarselo al filtro*/
  getAllUsers(): void {
    this.adminService.getAllUser().subscribe(
      (data: AllUsers[]) => {
        //console.log('getUsers',data);

        this.users = ['Todos', ...data.map(item => item.nombre)];

        console.log('ARREGLO DE SOLO LOS USUARIOS',this.users);

      },
      (error) => {
        console.error('Error al obtener la lista de Usuarios', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllUsers()
  }

  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (response: Orders[]) => {
        this.allOrders = response;

        this.dataSource = new MatTableDataSource<Orders>(this.allOrders);
        this.dataSource.paginator = this.paginator;
        this.getUserDetailsForOrders();

        console.log('TODAS LAS ORDENES', response);

        this.applyFilters();

      }
    });
  }

  getUserDetailsForOrders(): void {
    this.allOrders.forEach(resp => {
      this.authService.getUserById(resp.id_creador).subscribe(
        (response) => {
          resp.nombre = response.nombre;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  deleteOrder(orderId: string): void {
    this.ordersService.deleteOrderById(orderId).subscribe(
      () => {
        console.log('Orden eliminada con éxito', orderId);

        // Filtro la orden eliminada del array allOrders
        this.allOrders = this.allOrders.filter(order => order.numero !== orderId);
        this.dataSource.data = this.allOrders;

        // Snackbar para mostrar un mensaje de usuario eliminado, se debe importar en el constructor
        this.snackBar.open('Orden eliminada con éxito', '', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      },
      (error) => {
        console.error('ERROR AL ELIMINAR ORDEN', error);
      }
    );
  }

  //TODOS LOS FILTROS tests
  applyFilters(): void {
    let filteredOrders = this.allOrders;

    if (this.selectedMonth !== 'Todas') {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.fechaCreacion);
        return orderDate.getMonth() === this.months.indexOf(this.selectedMonth) - 1;
      });
    }

    if (this.selectedYear) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.fechaCreacion);
        return orderDate.getFullYear() === this.selectedYear;
      });
    }

    if (this.selectedUser && this.selectedUser !== 'Todos') {
      filteredOrders = filteredOrders.filter(order => {
        return order.nombre === this.selectedUser;
      });
    }

    this.dataSource.data = filteredOrders;
  }
}
