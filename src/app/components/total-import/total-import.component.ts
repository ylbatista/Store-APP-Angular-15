import { Component } from '@angular/core';
import { CarService } from 'src/app/pages/buy-car/car.service';

@Component({
  selector: 'app-total-import',
  template: `
  <!-- <p><small>Total: {{ total | currency }}</small></p> -->
  `,
  styles: ['']
})
export class TotalImportComponent {

  total: number = 0;


  constructor(
    private carService: CarService,

  ) { }



}
