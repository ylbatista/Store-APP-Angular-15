import { Injectable } from '@angular/core';

import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private api_url = environment.API_URL;

constructor(private http: HttpClient) {}

  //CONECTANDO A API PARA HACER GET DE PRODUCTOS X PAGINAS, DEVUELVE UN OBSERVER
  getProductsByPage(pageNo: number, pageSize: number): Observable<ProductList> {
    const url = `${this.api_url}/producto/mostrar?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<ProductList>(url);
  }

  //GET PRODUCT BY ID
  getProductById(id: string): any {
    const url = `${this.api_url}/producto/buscar/${id}`;
    return this.http.get<Product>(url);
  }

  //GET PRODUCT BY TIPO
   getProductByType(tipo: string){
    const url = `${this.api_url}/producto/filtro?pageNo=0&pageSize=15&filtro = ${tipo}`;
    return this.http.get<Product>(url);
  }

  ///UPDATE PRODUCT by ID
  updateProduct( productId: string, product: any ): Observable<any> {
    const url = `${this.api_url}/producto/update/${productId}`;
    return this.http.put(url, product);
  }

  ///DELETE PRODUCT by ID
  deleteProductById (id: string): Observable<any> {
    const url = `${this.api_url}/producto/delete/${id}`;
    return this.http.delete(url);
  }


}
