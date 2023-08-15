import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/app/environment/environment';
import { OrderItem } from 'src/app/interfaces/buy.interface';
import { CarProduct } from 'src/app/interfaces/car-product.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = environment.API_URL;

  private carProduct: CarProduct[] = [];

  //declaro el observable
  private product: BehaviorSubject<CarProduct[]>;

  constructor(
    private http: HttpClient,

  ) {
    //inicializo el observable
    this.product = new BehaviorSubject<CarProduct[]>([]);
  }

  //agregar producto nuevo al carrito
  addNewProduct(product: CarProduct): void {
    this.carProduct.push(product);
    this.product.next(this.carProduct);
  }

  get products(){
    return this.product.asObservable();
  }

  //borrar productos de la lista del carrito 1 a 1 por el boton delete
  deleteProduct(index: number){
    this.carProduct.splice(index, 1);
    //declaro nuevamente para actualizar la lista
    this.product.next(this.carProduct)
  }

  //haciedo peticion post http y retornando como observable el pago a la api
  payProduct(order: any): Observable <OrderItem>{
    return this.http.post<OrderItem>(`${this.apiUrl}/orden/crear`, order)
  }

  // Limpiar los Productos de la lista del carrito
  clearCar(){
    this.carProduct = [];
    this.product.next([]);
  }
}
