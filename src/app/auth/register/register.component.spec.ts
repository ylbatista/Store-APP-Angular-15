import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { UserRegister } from 'src/app/interfaces/user.interface';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['sendUser']);
    let snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CREATE', () => {
    expect(component).toBeTruthy();
  });

  // it('INICIALIZAR EL registerForm  with required fields', () => {
  //   // Llamar explícitamente al método ngOnInit para inicializar el formulario
  //   component.ngOnInit();

  //   // Verificar que el formulario se haya creado correctamente con los campos requeridos
  //   const form: FormGroup = component.registerForm;
  //   expect(form).toBeTruthy();
  //   expect(form.get('userName')).toBeTruthy();
  //   expect(form.get('pwd')).toBeTruthy();
  //   expect(form.get('pwd2')).toBeTruthy();
  //   expect(form.get('nombre')).toBeTruthy();
  //   expect(form.get('apellido')).toBeTruthy();
  //   expect(form.get('direccion')).toBeTruthy();

  //   // Verificar que los campos sean requeridos
  //   expect(form.get('userName')?.validator).toEqual(Validators.required);
  //   expect(form.get('pwd')?.validator).toEqual(Validators.required);
  //   expect(form.get('pwd2')?.validator).toEqual(Validators.required);
  //   expect(form.get('nombre')?.validator).toEqual(Validators.required);
  //   expect(form.get('apellido')?.validator).toEqual(Validators.required);
  //   expect(form.get('direccion')?.validator).toEqual(Validators.required);

  //   // Verificar que el formulario esté inválido inicialmente
  //   expect(form.valid).toBeFalsy();
  // });

  it('Llamar a authService.sendUser y mostrar snackbar cuando se envie un user', () => {
    const userData: UserRegister = {
      userName: 'testUser',
      pwd: 'testPassword',
      pwd2: 'testPassword',
      nombre: 'John',
      apellido: 'Doe',
      direccion: 'Test Address',
    };

    authService.sendUser.and.returnValue(of({}));

    component.registerForm.setValue(userData);
    component.sendUser();
    fixture.detectChanges();

    expect(authService.sendUser).toHaveBeenCalledWith(userData);
    expect(snackBar.open).toHaveBeenCalledWith('USUARIO CREADO', '', {
      duration: 3000,
      horizontalPosition: 'center',
    });
  });



});
