import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNotFoundComponent } from './p-not-found.component';

describe('PNotFoundComponent', () => {
  let component: PNotFoundComponent;
  let fixture: ComponentFixture<PNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
