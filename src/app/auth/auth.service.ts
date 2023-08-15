import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserResponse } from '../interfaces/user.interface';

const helper = new JwtHelperService();
const api_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getisLogged() {
    throw new Error('Method not implemented.');
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  //Creo obs para enviar señal y refrescar el componente header
  //para que cuando me desloguee, actualice header y me quite el boton del header
  private logoutSubject = new Subject<boolean>();

  //Creo obs para enviar señal y refrescar el componente sidebar
  //para que cuando me desloguee, actualice sidebar y oculte el boton del sidebar
  private userRoleSubject = new BehaviorSubject<string>('');
  constructor(

    private http: HttpClient,
    private router: Router,

  ) { this.checkToken(); }

    // GUARDO TOKEN EN EL LOCAL STORAGE
    public saveToken(token: string): void{
      localStorage.setItem('token', token);
    }

    // Obtiene el token almacenado en localStorage
    public getToken(): string | null {
      return localStorage.getItem('token');
    }

    // GUARDO ROL EN EL LOCAL STORAGE, PARA REUTILIZARLO POSTERIORMENTE
    public saveRol(rol: string): void{
      localStorage.setItem('rol', rol);
    }

    public hasRole(rol: string): boolean {
      const userRole = localStorage.getItem('rol');
      return !!userRole && userRole === rol;
    }

    //OBTENER ROL//
    public getRol(): string | null {
      return localStorage.getItem('rol');
    }

    //OBSERVER PARA MOSTRAR EL BOTON DEL SIDEBAR
    // JUNTO CON LA DIRECTIVA DE MOSTRAR EL BOTON SI ES ADMIN
    setUserRole(rol: string) {
      this.userRoleSubject.next(rol);
    }

    //GET para obtener el userRoleSubject
    getUserRole(): Observable<string> {
      return this.userRoleSubject;
    }

    //////////////////////////////////////////
    get isLogged(): Observable<boolean>{
      return this.loggedIn.asObservable();
    }

    //HACIENDO SERVICIO POST PARA LOGIN
    login(authData: User): Observable<UserResponse | void> {
      return this.http
      .post<UserResponse>(`${environment.API_URL}/api/auth/login`, authData)
        .pipe(
          map((respuesta: UserResponse) =>{

            const rol = respuesta.rol;
            console.log('LOGADO COMO:', rol);

            //respuesta del backend al logarme
            //console.log(respuesta);

            this.saveToken(respuesta.token);
            this.saveRol(respuesta.rol);
            //this.loggedIn.next(true);
            return respuesta;

          }),

        catchError((err)=> this.handlerError(err))
      );

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.loggedIn.next(false);
    //alert("desconectado");

    //redireccionar a la pagina home
    this.logoutSubject.next(true);
    this.router.navigate(['/home']);

  }

  //GET para obtener el logoutSUbject
  getLogoutSubject(): Subject<boolean> {
    return this.logoutSubject;
  }

  public checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired=>', isExpired);

    //solucion con ternario
    isExpired? this.logout() : this.loggedIn.next(true);

  }

  private handlerError(err: { message: any; }): Observable <never> {
    let errorMessage = 'Error recibiendo data';
      if(err){
        errorMessage= `Error: code ${err.message}`;
      }

      window.alert(errorMessage);
    return throwError(errorMessage);
  }

  ////enviando registro de usuario
  sendUser(user: User): Observable<User> {
    const url = `${api_url}/api/auth/register`;
    return this.http.post<User>(url, user);
  }

  getUserById(id: string): Observable <any>{
    const url = `${api_url}/api/users/id/${id}`;
    return this.http.get<any>(url);
  }

}
