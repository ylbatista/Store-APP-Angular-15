import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminRoutingModule } from '../admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';




@NgModule({
  declarations: [
    OrdersComponent,
    AllOrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    //MATERIAL
    MaterialModule,
    FormsModule,
    MatTooltipModule,
    MatTableModule,

    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    //para el manejo de fecha
    MatDatepickerModule,
    //MatInputModule,
    MatNativeDateModule,

    AdminRoutingModule
  ]
})
export class OrdersModule { }

