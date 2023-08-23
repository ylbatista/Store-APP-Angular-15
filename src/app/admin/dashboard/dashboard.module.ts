import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { AdminModule } from '../admin.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [

  ],

  imports: [
    CommonModule,

    MaterialModule,
    AdminModule,
    PagesModule,
    SharedModule,


    NgApexchartsModule,
  ]
})
export class DashboardModule { }
