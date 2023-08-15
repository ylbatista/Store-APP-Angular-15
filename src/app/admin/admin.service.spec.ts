import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';
import { Product } from '../interfaces/product.interface';
import { environment } from '../environment/environment';
import { AllUsers, User, UserResponse } from '../interfaces/user.interface';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Dame los productos por pagina', () => {
    const pageNo = 1;
    const pageSize = 10;

    //mock del res esperado
    const expectedProducts: Product[] = [
      {id: '451231',nombre: 'Product 1', precio: 10, cantidad: 2, descripcion:'prueba', img: 'img test', tipo: 'tipo test'},
      {id: 'asdad',nombre: 'Product 2', precio: 30, cantidad: 2, descripcion:'prueba', img: 'img test', tipo: 'tipo test'},
    ];

    service.getProductsByPage(pageNo, pageSize).subscribe((products: Product[]) => {
      expect(products).toEqual(expectedProducts);
    });

    //Expectativa de llamada http
    const req = httpMock.expectOne(`${environment.API_URL}/endpoint_con_paginacion?pageNo=${pageNo}&pageSize=${pageSize}`);
    expect (req.request.method).toBe('GET');

    //Enviar la respuesta mockeada
    req.flush(expectedProducts);
  });

  it('Crear product Data', ()=>{
    //mock de los datos del formulario
    const formData = new FormData();
    formData.append('nombre', 'Product 1');
    formData.append('precio', '10');

    //Mock del resultado esperado
    const expectedProduct: Product = {
      id: '1',
      nombre: 'Product 1',
      precio: 10,
      descripcion: 'descripcion test',
      img: 'img test',
      cantidad: 11,
      tipo: 'tipo test'
    };

    service.productData(formData).subscribe((product) => {
      expect(product).toEqual(expectedProduct);
    });

    //Expectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/producto/crear`);
    expect(req.request.method).toBe('POST');

    //Envia resp mockeada
    req.flush(expectedProduct);
  });

  it('Dame todos los usuarios', () => {
    //Datos Mock de los users
    const expectedUsers: AllUsers [] = [
      {
        id: 'ada',
        userName:'username',
        pwd:'pwd',
        rol: 'ADMIN',
        nombre: 'nombre',
        apellido: 'apellido',
        direccion: 'direccion',

      },
    ];

    service.getAllUser().subscribe((users) => {
      expect(users).toEqual(expectedUsers);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/api/users`);
    expect(req.request.method).toBe('GET');

    //Envía la resp mockeada
    req.flush(expectedUsers);
  });

  it('DAME TODOS LOS USUARIOS POR ID',()=>{

    const userId = '123';
    const expectedAllUsers: AllUsers [] = [
    {
      id: 'ada',
      userName:'username',
      pwd:'pwd',
      rol: 'ADMIN',
      nombre: 'nombre',
      apellido: 'apellido',
      direccion: 'direccion',
    },
  ];

  service.getUserById(userId).subscribe((users) => {
    expect(users).toEqual(expectedAllUsers);
  });

  //Espectativa de la llamada HTTP
  const req = httpMock.expectOne(`${environment.API_URL}/api/users`);
  expect(req.request.method).toBe('GET');

  //Envía la resp mockeada
  req.flush(expectedAllUsers);

  });

  it('PETICION ACTUALIZAR USUARIO', () => {
    const userId = '123';
    const updatedUser = {nombre: 'nombreTest', email:'email@tests.com'}

    //Mock de la respuesta del servidor al realizar la actualizacion
    const apiResponse = {success: true, message: 'Usuario actualizado correctamente'};

    service.updateUser(userId, apiResponse).subscribe((response) => {
      expect(response).toEqual(apiResponse);
    });

    //Espectativa de la llamada HTTP
    // Expectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/api/users/id/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser); // Verifica que los datos enviados sean los correctos


    //Enviar la respuesta mockeada
    req.flush(apiResponse);
  });

  it('PETICION BORRAR USUARIO POR ID',() => {
    const userId = '123';
    //Mock de la repsuesta de la api al eliminar el usuario
    const apiResponse = {success: true, message: 'Usuario eliminado correctamente'};

    service.deleteUserById(userId).subscribe((response) => {
      expect(response).toEqual(apiResponse);
    });

    //Espectativa de la llamada HTTP
    const req = httpMock.expectOne(`${environment.API_URL}/api/users/id/${userId}`);
    expect(req.request.method).toBe('DELETE');

    //envia la respuesta mockeada
    req.flush(apiResponse);
  })

});
