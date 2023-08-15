import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdminService } from '../../admin.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  public archivos: any = [];

  previsualizacion: string | ArrayBuffer | null = null;

  productForm!: FormGroup;
  selectedFile: any = [];

  previewImageUrl: SafeUrl | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer

  ){}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre:['', Validators.required],
      descripcion:['', Validators.required],
      precio:['', Validators.required],
      cantidad:['', Validators.required],
      tipo:['', Validators.required],
      file: File
    });
  }

  ///capturo la imagen y la convierto para poder visualizarla en el dom
  capturarFile(event: any) {
    this.selectedFile = event.target.files[0];
    const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
    const url = URL.createObjectURL(blob);
    this.previewImageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  productData(){

    if(this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.productForm.value.nombre);
    formData.append('descripcion', this.productForm.value.descripcion);
    formData.append('precio', this.productForm.value.precio);
    formData.append('cantidad', this.productForm.value.cantidad);
    formData.append('tipo', this.productForm.value.tipo);
    formData.append('file', this.selectedFile);

    ///////SUBSCRIBIENDOSE AL OBSERVABLE DEL ADMIN.SERVICE.TS////
    this.adminService.productData(formData).subscribe({

      next:(response: any ) => {

        console.log('PRODUCTO AGREGADO CON EXITO', response);

        //reinicio los productos introducidos al form para que se limpie una vez envida la data
        this.productForm.reset();

        this.snackBar.open('El producto fue creado con exito', '',{
          duration: 3000,
          horizontalPosition: 'center',
        });
      },

      error:(e) => {
        console.warn('Error al enviar el form', e);

        this.snackBar.open('El producto no se ha creado', '',{
          duration: 5000,
          horizontalPosition: 'center',
        });
      },

      complete: () => {
        console.info('complete')
      },
    });

  }

  /////snackBar para mostrar un mensaje de producto eliminado, se debe importar en el constructor
  openSnackBar(message: string, action: string): MatSnackBarRef<any>{
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
