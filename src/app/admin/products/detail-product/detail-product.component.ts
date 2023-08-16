import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {

  editForm!: FormGroup;
  productId!: string;
  productImg!: any;

  previewImageUrl: SafeUrl | null = null;
  selectedFile: any = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    //private sanitizer: DomSanitizer

  ){}

  ///capturo la imagen y la convierto para poder visualizarla en el dom
  capturarFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productImg = reader.result;
      };
    }
  }

  ngOnInit(): void {
    const product: Product  = history.state.product;

    this.productId = product.id;
    this.productImg = product.img;

    this.editForm = this.fb.group({
      nombre: [product.nombre, Validators.required],
      descripcion: [product.descripcion, Validators.required],
      precio: [product.precio, Validators.required],
      cantidad: [product.cantidad, Validators.required],
      tipo: [product.tipo, Validators.required],
      file: [product.img]
    });
  }

  ///ME SUBSCRIBO AL SERVICIO PARA ACTUALIZAR LOS DATOS
  updateProduct(): void {

    const updatedProduct = this.editForm.value;
    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: ( response: any ) => {
        console.log('PRODUCTO ACTUALIZADO CORRECTAMENTE', response);

        this.snackBar.open('PRODUCTO ACTUALIZADO CORRECTAMENTE', '',{
          duration: 3000,
          horizontalPosition: 'center',
        });
      },

      error:(e) => {
        console.warn('ERROR AL ACTUALIZAR EL PRODUCTO', e);
      },

      complete: () => {
        console.info('complete')
      },
    });
    //this.editForm.reset();
  }

  /////snackBar para mostrar un mensaje de producto eliminado, se debe importar en el constructor
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
