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

  //array productType para solo enviar el (tipo) de cada producto
  productType: string [] = [];

  selectedProductType: string = '';
  //array para almacenar todos los productos
  allProduct: Product[] =[];

  //array para almacenar los productos filtrados por (tipo)
  filteredProducts: Product[] = [];

  //para radiobutton
  selectedPriceRange!: string;

  //para simular la carga en un (mat-progress-bar) cuando llamo a la funcion applyFilter
  isLoading: boolean = false;
  isFiltering: boolean = false;

  constructor (
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
    this.selectedPriceRange = 'all';
    // this.selectedProductType = 'All types';
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

    this.isLoading = true;
    console.log('carga empezada');

    setTimeout(() => {

      // Filtrado por tipo de producto
      let filteredProductsByType: Product[] = this.allProduct;

      if (this.selectedProductType && this.selectedProductType !== 'All types') {
        filteredProductsByType = this.allProduct.filter(product => product.tipo === this.selectedProductType);
      }

      // Filtrado por rango de precios
      if (this.selectedPriceRange === 'all') {
      this.filteredProducts = filteredProductsByType;

      } else if (this.selectedPriceRange === '0-5') {
        this.filteredProducts = filteredProductsByType.filter(product => product.precio >= 0 && product.precio <= 5);

      } else if (this.selectedPriceRange === '6-10') {
        this.filteredProducts = filteredProductsByType.filter(product => product.precio >= 6 && product.precio <= 10);

      } else if (this.selectedPriceRange === '11-20') {
        this.filteredProducts = filteredProductsByType.filter(product => product.precio >= 11 && product.precio <= 20);

      } else if (this.selectedPriceRange === '21+') {
        this.filteredProducts = filteredProductsByType.filter(product => product.precio > 20);
      }
      
      this.isLoading = false;
      console.log('Carga detenida');
    }, 500);



  }

  //////snackbar message
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
