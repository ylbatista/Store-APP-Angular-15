import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MaterialModule } from '../shared/material.module';
import { OrdersModule } from './orders/orders.module';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    RouterModule,

    ProductsModule,
    UsersModule,
    OrdersModule,
    //DashboardModule,

    //MATERIAL
    MaterialModule,
    MatTooltipModule,

    AdminRoutingModule
  ]
})
export class AdminModule { }
