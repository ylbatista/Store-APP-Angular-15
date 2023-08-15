/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IsLoggedDirective } from './isLogged.directive';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';

describe('Directive: IsLogged', () => {

  let fixture: ComponentFixture<any>;
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;
  let element: ElementRef;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsLoggedDirective],
      // Aquí puedes proporcionar los servicios o mocks necesarios
      // para el funcionamiento de la directiva en las pruebas.
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = fixture.componentInstance;
    expect(directive).toBeTruthy();
  });
});

//componente de prueba para el TestBed
@Component({
  template: '<div appIsLogged></div>'
})
class TestComponent {
  isLoggedIn = false;
}
