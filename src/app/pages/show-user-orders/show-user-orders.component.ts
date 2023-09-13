import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/admin/orders/orders.service';
import { OrderListUser } from 'src/app/interfaces/orders.interface';

@Component({
  selector: 'app-show-user-orders',
  templateUrl: './show-user-orders.component.html',
  styleUrls: ['./show-user-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ShowUserOrdersComponent {

  months: string[] = ['Todas','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = [2023, 2024, 2025];
  days: string[] = ['Todos','Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5','Día 6', 'Día 7',
                   'Día 8', 'Día 9', 'Día 10', 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15',
                   'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20', 'Día 21', 'Día 22', 'Día 23',
                   'Día 24', 'Día 25', 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30', 'Día 31'];



  selectedMonth: string = this.months[0]; // Inicializar en Todos
  selectedYear: number = this.years[0];   // Inicializar con el primer año
  selectedDay: string = this.days[0];     // Inicializar en Todos

  idCreador: string[] = [];

  orders: OrderListUser[] = [];
  dataSource!: MatTableDataSource<OrderListUser>;

  columnsToDisplay = ['Id Orden','Fecha de Creación', 'Importe Orden'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: OrderListUser;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ordersService: OrdersService,
  ){}

  //RECIBIENDO LA SUBSCRIPCION DEL OBS PARA OBTENER EL LISTADO DE OrDENES POR USER
  ngOnInit(): void {
    this.ordersService.getOrdersByToken().subscribe({
      next: (response: OrderListUser[]) => {
        this.orders = response;
        console.log('LISTADO DE ORDENES DEL USUARIO',response);

        //le asigno al dataSource una nueva instancia y le doy como parametro this.orders
        this.dataSource = new MatTableDataSource<OrderListUser>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.applyFilters();
      }
    });
  }

  //TODOS LOS FILTROS
  applyFilters(): void {

    let filteredOrders = this.orders;

    //Filtrado por Mes seleccionado
    if (this.selectedMonth !== 'Todas') {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.fechaCreacion);
        return orderDate.getMonth() === this.months.indexOf(this.selectedMonth) - 1;
      });
    }

    //Filtrado por Año seleccionado
    if (this.selectedYear) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.fechaCreacion);
        return orderDate.getFullYear() === this.selectedYear;
      });
    }

    //Filtrando por Día seleccionado
    if (this.selectedDay !== 'Todos') {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.fechaCreacion);
        return orderDate.getDate() === this.days.indexOf(this.selectedDay) - 1;
      });
    }

    this.dataSource.data = filteredOrders;
  }
}
