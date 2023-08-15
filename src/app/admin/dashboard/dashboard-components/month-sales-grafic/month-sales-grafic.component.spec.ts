import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSalesGraficComponent } from './month-sales-grafic.component';

describe('MonthSalesGraficComponent', () => {
  let component: MonthSalesGraficComponent;
  let fixture: ComponentFixture<MonthSalesGraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthSalesGraficComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthSalesGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
