import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullListComponent } from './full-list/full-list.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { AdminRoutingModule } from '../admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products.component';




@NgModule({
  exports: [
    ProductsComponent,
    AddProductComponent,
    FullListComponent,
    DetailProductComponent,
  ],

  declarations: [
    ProductsComponent,
    AddProductComponent,
    FullListComponent,
    DetailProductComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    

    //MATERIAL
    MaterialModule,
    MatTooltipModule,

    AdminRoutingModule
  ]
})
export class ProductsModule { }
