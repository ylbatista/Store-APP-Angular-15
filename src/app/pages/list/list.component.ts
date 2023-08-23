import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/product.interface';
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

  public totalProductsBag: number = 0;
  showBack: boolean = false;
  productType: string [] = ['All types'];

  selectedProductType: string = '';

  allProduct: Product[] =[];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private carService: CarService,
    private badgeService: BadgeService,
    private snackBar: MatSnackBar,

  ) {}

  //ENVIAR PRODUCTO AL CARRITO
  sendData(product: Product): void {
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
        // console.log('Response api',objeto);
        const { content } = objeto;
        console.log('TODOS LOS PRODUCTOS', content);
        this.allProduct = content;

        // para mostrar solo una vez el tipo de los productos en el array
        this.productType = ['All types', ...Array.from(new Set(content.map(item => item.tipo)))];
        console.log('arreglo solamente con el TIPO de productos', this.productType);

        this.applyFilters();
      }
    });
  }

  ////FILTRAR PRODUCTOS POR TIPO DE PRODUCTO
  filtrarProductos(): void {
    const pageNo = 0; // Puedes ajustar estos valores según tus necesidades
    const pageSize = 15;
    this.getProductsByPage(pageNo, pageSize);
  }

  /*Funcion para aplicar filtros*/
  applyFilters(): void {

    if ( this.selectedProductType && this.selectedProductType !== 'All types') {
      this.filteredProducts = this.allProduct.filter(product => product.tipo === this.selectedProductType);
    } else {
      this.filteredProducts = this.allProduct;
    }
  }

  //////snackbar message
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
