import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { CarService } from 'src/app/pages/buy-car/car.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss'],
})

export class FullListComponent {

  expandedElement: Product | null = null;

  products: Product [] = [];

  displayedColumns: string[] = [ 'id','tipo','nombre', 'descripcion','cantidad', 'precio', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private productService: ProductService,
    private route:          ActivatedRoute,
    private router:                 Router,
    private snackBar:          MatSnackBar,
    private carService:         CarService,

    ) {
    this.dataSource = new MatTableDataSource<Product>(this.products);
   }

    ngOnInit(): void {
      this.getProductsByPage(0, 100);
      this.route.params.subscribe(params => this.applyFilter(params['event']));
    }

    //////////////PETICION GET PARA MOSTRAR PRODUCTOS
    getProductsByPage(pageNo: number, pageSize: number): void {
    this.productService.getProductsByPage(pageNo, pageSize).subscribe ({

      next: (response) => {
        const { content } = response;

        console.log('RESPUESTA API',response);
        this.products = content;
        this.dataSource.data = this.products;
      },
      error: (error) => console.log(error),
      complete: () => console.info('complete')
    });
  }

  //////////////PETICION PARA BORRAR PRODUCTOS CON FILTER
  deleteProduct(id: string): void {
    this.productService.deleteProductById (id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);

      //llamo denuevo al getProductsByPage para actualizar
      this.getProductsByPage(0, 15);

      /////snackBar para mostrar un mensaje de producto eliminado, se debe importar en el constructor
      this.snackBar.open('Producto eliminado con exito', '',{
        duration: 3000,
        horizontalPosition: 'center',
      })
    },
      (error) => {
        console.error("Error al eliminar el usuario", error);
      }
    );
  }

  ///////FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.route.params.subscribe(params => this.applyFilter(params['event']));
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //ENVIAR DATA DEL PRODUCTO A DETAIL-PRODUCT
  editProduct(product: Product): void {
    this.router.navigate(['/admin/detail-product'], { state: { product } });
  }

}
