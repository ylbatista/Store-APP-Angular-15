import { Component } from '@angular/core';
import { Observable, Subscription, debounceTime } from 'rxjs';

import { environment } from 'src/app/environment/environment';
import { CarProduct } from 'src/app/interfaces/car-product.interface';
import { CarService } from './car.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BadgeService } from 'src/app/shared/badge/badge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrls: ['./buy-car.component.scss']
})
export class BuyCarComponent {

  apiUrl = environment.API_URL;
  total: number = 0;

  products: CarProduct[] = [];
  id: string[] = [];

  selectCant: number = 1;

  private productsSubscription!: Subscription;
  private quantityChangeSubscription!: Subscription;

  constructor(
    private carService: CarService,
    private snackBar: MatSnackBar,
    private badgeService: BadgeService,
    private router: Router,
  ) {}

  clearCar(){
    this.products = [];
  }

  ngOnInit(): void {
    this.carService.products.subscribe(products => {
      this.products = products.map(product => ({
        ...product,
      selectCant: product.selectCant ?? 1 // Establesco 1 como la cantidad por defecto
      }));
      this.updateTotal();

      // Desuscribirse de cualquier suscripción existente a quantityChangeSubscription
      if (this.quantityChangeSubscription) {
        this.quantityChangeSubscription.unsubscribe();
      }

      // Suscribirse a cambios en selectCant usando debounceTime para reducir actualizaciones innecesarias
      this.quantityChangeSubscription = new Observable<number>((observer) => {
        observer.next(this.selectCant);
      })
        .pipe(debounceTime(500)) // Ajusta el debounceTime según tus preferencias
        .subscribe((quantity) => {
          this.updateTotal();
        });
    });
  }

  //funcion para recalcular el total y las cantidades cantXproduct
  //para cada product individualmente
  updateTotal(): void {
    this.products.forEach((product) => {
      product.cantXproduct = product.precio * (product.selectCant ?? 1); // Usa la cantidad seleccionada específica para cada producto
    });

    this.total = this.products.reduce((accumulator, product) => {
      const cantXproduct = product.cantXproduct ?? 0;
      return accumulator + cantXproduct;
    }, 0);
  }

  onClickDelete(indice: number): void {
    this.carService.deleteProduct(indice);

    this.badgeService.decrementCounter();

    //////snackbar message
    this.snackBar.open('El producto fue eliminado del carrito', '', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }

  payProduct(): void {
    const order: any = {
    lista: this.products.map(product => ({
      cantidad: product.selectCant ?? 1,
      id_producto: product.id,
      total: product.cantXproduct ?? 0,
      detalles: [
        {
          cantidad_detalle: 2,
          descripcion_detalle: 'Descripción del detalle',
        }
      ]
      })),
      token: localStorage.getItem('token'),
      total: this.total,
    };

    console.log('ENVIANDO PAGO AL BACKEND', order);

    this.carService.payProduct(order).subscribe(
      response => {
        console.log('Orden enviada con éxito', response);

        // Limpio los datos de la lista del carrito
        this.carService.clearCar();

        // Limpio los datos del contador para reiniciar las notificaciones
        this.badgeService.clearBadgeNotify();

        //////snackbar message
        this.snackBar.open('PAGO REALIZADO $', order.total , {
          duration: 5000,
          horizontalPosition: 'center'
        });

      },
      error => {
        console.warn('Error al enviar la orden', error);

        //////snackbar message
        this.snackBar.open('PAGO ERRONEO, O NO ESTAS LOGADO', '', {
          duration: 3000,
          horizontalPosition: 'center'
        });
      }
    );
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if(this.quantityChangeSubscription) {
      this.quantityChangeSubscription.unsubscribe();
    }
  }

  addMoreProduct(){
    this.router.navigate(['/pages/list']);
  }

}
