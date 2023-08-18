import { Component } from '@angular/core';
import { CarService } from 'src/app/pages/buy-car/car.service';

@Component({
  selector: 'app-total-import',
  template: `
  <p><strong>Total: {{ total | currency }}</strong></p>
  `,
  styles: ['']
})
export class TotalImportComponent {

  total: number = 0;


  constructor(
    private carService: CarService,
    
  ) { }



}
