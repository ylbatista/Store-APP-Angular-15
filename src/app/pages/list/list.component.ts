import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/product.interface';
import { CarProduct } from 'src/app/interfaces/car-product.interface';
import { ProductService } from 'src/app/services/product.service';
import { CarService } from '../buy-car/car.service';

import { BadgeService } from 'src/app/shared/badge/badge.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: Product [] = [];
  carProducts: CarProduct [];
  public totalProductsBag: number = 0;

  typeProduct!: string;
  showBack: boolean = false;

  constructor(
    private productService: ProductService,
    private carService: CarService,
    private badgeService: BadgeService,
    private snackBar: MatSnackBar,

    ) {
      //dentro del constructor
      this.carProducts = [
        {cantidad: 0, descripcion: 'string', id: 'string', img: 'string', nombre:'string', precio: 0},
      ];
  }

  getVisibleProducts(): CarProduct[] {
    return this.products.filter(product => product.cantidad > 0);
  }

  toggleCardDescription(product: Product): any {
    //this.products.descripcion = !this.products.descripcion;
  }

  //ENVIAR PRODUCTO AL CARRITO
  sendData(product: any) {
    this.carService.addNewProduct(product);
    console.log('ENVIO PRODUCTO AL COMPONENTE CARR',product);

    ///al llamar la funcion addCar incremento el contador en el badgeService
    this.badgeService.incrementCounter();

    this.snackBar.open('PRODUCTO AGREGADO AL CARRITO', '',{
      duration: 3000,
      horizontalPosition: 'center',
    });
  }

  ngOnInit(): void {
    this.getProductsByPage(0,15);
  }

  getImageUrl(imageName: string){
    return imageName;
  }

 /////////////////////////////////////////////////////////////
  getProductsByPage(pageNo: number, pageSize: number): void {
    this.productService.getProductsByPage(pageNo, pageSize).subscribe({
      next: (response) => {
        const objeto = response;
        const { content } = objeto;
        console.log('RECIBO LA DATA PARA MOSTRAR EN LIST PRODUCT', content);

        // Filtrar los productos por tipo de producto y con un minimo de 3 char utilizando uppercase
        if (this.typeProduct && this.typeProduct.length >= 3) {
          const typeProductUpperCase = this.typeProduct.toUpperCase();
          this.products = content.filter(product =>
            product.tipo.toUpperCase().includes(typeProductUpperCase));
        } else {
          this.products = content;
        }

        if (content.length > 0) {
          const imageUrl = content[0].img;

          console.log("URL de la img", imageUrl);
          //this.showImage = imageUrl;

        }

        this.productService.getProductsByPage(pageNo, pageSize)

      },

      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  ////FILTRAR PRODUCTOS POR TIPO DE PRODUCTO
  filtrarProductos(): void {
    const pageNo = 0; // Puedes ajustar estos valores según tus necesidades
    const pageSize = 15;
    this.getProductsByPage(pageNo, pageSize);
  }

  //////snackbar message
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
