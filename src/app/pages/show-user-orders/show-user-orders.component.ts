import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
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

  displayedColumns: string[] = ['numero', 'fechaCreacion', 'total', 'actions'];
  orders: OrderListUser[] = [];

  constructor(
    private ordersService: OrdersService,
  ){}

  //RECIBIENDO LA SUBSCRIPCION DEL OBS PARA OBTENER EL LISTADO DE OEDENES POR USER
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (response: OrderListUser[]) => {
        this.orders = response;
          console.log('LISTADO DE ORDENES DEL USUARIO',response);
      }
    });
  }
}
