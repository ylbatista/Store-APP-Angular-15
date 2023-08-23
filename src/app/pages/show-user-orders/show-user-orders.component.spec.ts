import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserOrdersComponent } from './show-user-orders.component';
import { OrdersService } from 'src/app/admin/orders/orders.service';
import { OrderListUser } from 'src/app/interfaces/orders.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ShowUserOrdersComponent', () => {
  let component: ShowUserOrdersComponent;
  let fixture: ComponentFixture<ShowUserOrdersComponent>;
  let ordersService: jasmine.SpyObj<OrdersService>;

  const mockOrders: OrderListUser[] = [
    { numero: '123', fechaCreacion: '2022-12-01', total: 50,id_creador: '456', nombre: 'nombre', yearMonthDate:'2022-12-01'},
    { numero: '456', fechaCreacion: '2022-12-15', total: 30,id_creador: '456', nombre: 'nombre', yearMonthDate:'2022-12-15'},
    // Agrega más órdenes de ejemplo según sea necesario
  ];


  beforeEach(async () => {
    const ordersServiceSpy = jasmine.createSpyObj('OrdersService',['getOrders']);

    await TestBed.configureTestingModule({
      declarations: [ ShowUserOrdersComponent ],
      imports: [BrowserAnimationsModule],
      providers: [{ provide: OrdersService, useValue: ordersServiceSpy}]
    }).compileComponents();

    ordersService = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserOrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('INICIALIZANDO LISTA ORDENES USUARIO',() => {
    // ordersService.getAllOrders.and.returnValue(of(mockOrders));
    // fixture.detectChanges();

    // expect(component.orders).toEqual(mockOrders);
  });

});
