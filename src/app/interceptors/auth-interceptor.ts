import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtengo el token de admin desde localStorage
    const authToken = localStorage.getItem('token');
    
    // Verifica si hay un token de admin
    // y agrega el encabezado de autorización correspondiente
    if(authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }else{
      console.log('TOKEN CADUCADO O INVALIDO');
      
    }
  
    //console.log('PASó X EL INTERCEPTOR Y SE LLEVO EL TOKEN');
    return next.handle(req);
  }
}

///SE IMPORTA EN EL PROVIDERS DEL APP.MODULE.TS
