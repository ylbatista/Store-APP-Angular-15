/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderListUser, Orders } from 'src/app/interfaces/orders.interface';
import { environment } from 'src/app/environment/environment';

describe('Service: Orders', () => {

  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService]
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));

  it('GET ALL ORDERS', () => {
    //Mock del resultado esperado
    const expectedOrders: Orders[] = [
      {id_creador:'123', total: 10, numero: '123', fechaCreacion: '12/2/2022', nombre: 'nombre test', idOrder: '234', yearMonthDate: '2023/10'},
      {id_creador:'234', total: 3, numero: '3434', fechaCreacion: '12/2/2022', nombre: 'nombre test', idOrder: '234', yearMonthDate: '2023/10'},
      //se puede agregar mas ordenes mock
    ];
    //mock del token almacenado en el localstorage
    //spyOn(localStorage, 'getItem').and.returnValue('mocked-token');

    service.getAllOrders().subscribe((orders) => {
      expect(orders).toEqual(expectedOrders);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/orden/mostrarTodo`);
    expect(req.request.method).toBe('GET');

    //Enviar la respuesta mockeada
    req.flush(expectedOrders);
  });

  it('GET ORDER BY ID', () => {
    const orderId = '45678764';

    const expectedOrderById: Orders = {
      id_creador: '123',
      total: 10,
      numero: '123',
      fechaCreacion: '12/2/2022',
      nombre: 'nombre test',
      idOrder: '234',
      yearMonthDate: '2023/10'
    };

    service.getOrdersById(orderId).subscribe((order) => {
      expect(order).toEqual(expectedOrderById);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/orden/mostrarId/${orderId}`);
    expect(req.request.method).toBe('GET');

    //Enviar la resp mockeada
    req.flush(expectedOrderById);
  })


  it('GET ORDER BY TOKEN', () => {
    //Mock del resultado esperado
    const token = '123516735167';

    const expectedOrdersByToken: OrderListUser[] = [
      {id_creador:'123', total: 10, numero: '123', fechaCreacion: '12/2/2022', nombre: 'nombre test', yearMonthDate: ''},

      //se puede agregar mas ordenes mock
    ];
    //mock del token almacenado en el localstorage
    //spyOn(localStorage, 'getItem').and.returnValue('token');

    service.getOrderDataById(token).subscribe((orders) => {
      expect(orders).toEqual(expectedOrdersByToken);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/orden/mostrar?token`);
    expect(req.request.method).toBe('GET');

    //Enviar la respuesta mockeada
    req.flush(expectedOrdersByToken);
  });

  it('PETICION BORRAR ORDEN POR ID',() => {
    const orderId = '123';
    //Mock de la repsuesta de la api al eliminar la orden
    const apiResponse = {success: true, message: 'Usuario eliminado correctamente'};

    service.deleteOrderById(orderId).subscribe((response) => {
      expect(response).toEqual(apiResponse);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/api/users/id/${orderId}`);
    expect(req.request.method).toBe('DELETE');

    //envia la respuesta mockeada
    req.flush(apiResponse);
  })

  it('DAME ORDENES POR FECHA',() => {
    const month = '09';
    const year = 2023;

    //Mock de los datos de las ordenes esperadas
    const expectedOrders: Orders[] = [
      {total:2, numero:'54',fechaCreacion: '12/12/2022', id_creador: '456', nombre:'nombre',idOrder:'123', yearMonthDate: '2022/12'},
    ];

    service.getOrderByDate(month, year).subscribe((orders) => {
      expect(orders).toEqual(expectedOrders);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/orden/mostrarTodoFecha?mes=09&Agno=2023`);
    expect(req.request.method).toBe('GET');

    //enviar resp mockeada
    req.flush(expectedOrders);
  })

});
