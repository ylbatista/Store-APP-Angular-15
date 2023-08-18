import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { OrderData, OrderListUser, Orders } from 'src/app/interfaces/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

 private api_url = environment.API_URL;

 constructor(
  private http: HttpClient,
  ) { }

  //GET ORDERS BY TOKEN, para mostrar a cada usuario su registro de ordenes
  getOrdersByToken(): Observable <OrderListUser[]>{
    const token = localStorage.getItem('token');
    const url = `${this.api_url}/orden/mostrar?token=${token}`;
    return this.http.get<OrderListUser[]>(url);
  }

  //ADMIN  GET ALL ORDERS
  getAllOrders(): Observable <Orders[]>{
    const url = `${this.api_url}/orden/mostrarTodo`;
    return this.http.get<Orders[]>(url);
  }

  //GET ORDERS by id
  getOrdersById(id: string ): Observable <any>{
    const url = `${this.api_url}/orden/mostrarId/${id}`;
    return this.http.get<Orders[]>(url);
  }

  //GET ORDER DATA BY ID
  getOrderDataById(id: string): Observable <any>{
    const url = `${this.api_url}/detalle/findAll/${id}`;
    return this.http.get<OrderData[]>(url);
  }


  getOrderByDate(month: string, year: number ): Observable <any>{
    const url = `${this.api_url}/orden/mostrarTodoFecha?mes= ${month}&Agno=${year}`;
    return this.http.get<Orders>(url);
  }

  // BORRAR ORDEN BY ID
  deleteOrderById(orderId: string): Observable <any> {
    const url = `${this.api_url}/orden/delete/${orderId}`;
    return this.http.delete(url);
  }

}
