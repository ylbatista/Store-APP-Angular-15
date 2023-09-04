import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { AllUsers } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getProductsByPage (pageNo: number, pageSize: number): Observable <Product[]> {
    return this.http.get<Product[]>(`${this.api_url}/producto/mostrar?pageNo=${pageNo}&pageSize=${pageSize}`)
  }

  private api_url = environment.API_URL;

  constructor(
    private http: HttpClient,

  ) { }

  //haciedo peticion post http y retornando como observable el pago a la api
  productData(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.api_url}/producto/crear`, formData);
  }

  //DAME TODOS LOS USUARIOS
  getAllUser(): Observable <AllUsers[]>{
    return this.http.get<AllUsers[]>(`${this.api_url}/api/users`);
  }

  //DAME TODOS LOS USUARIOS BY ID
  getUserById(id: string): Observable <AllUsers[]> {
    const url = `${this.api_url}/api/users/id/${id}`;
    return this.http.get<any>(url);
  }

  //UPDATE USER by id
  updateUser( userId: string, user: any ): Observable<any> {
    const url = `${this.api_url}/api/users/edit/${userId}`;
    return this.http.put(url, user);
  }

  //DELETE USERS by id
  deleteUserById (id: string): Observable<any> {
    const url = `${this.api_url}/api/users/id/${id}`;
    return this.http.delete(url);
  }

}


