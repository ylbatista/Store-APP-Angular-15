import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialModule } from './shared/material.module';

import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { BadgeComponent } from './shared/badge/badge.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MonthSalesGraficComponent } from './admin/dashboard/dashboard-components/month-sales-grafic/month-sales-grafic.component';
import { DashboardModule } from './admin/dashboard/dashboard.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficsComponent } from './admin/dashboard/dashboard-components/grafics/grafics.component';
import { AllOrdersComponent } from './admin/orders/all-orders/all-orders.component';
//import { ApexChart } from 'ng-apexcharts';


@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,

    BadgeComponent,
    FooterComponent,
    DashboardComponent,

    MonthSalesGraficComponent,
    GraficsComponent,
    // AllOrdersComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AuthModule,
    PagesModule,
    SharedModule,
    AdminModule,

    DashboardModule,

    MatSnackBarModule,
    MaterialModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,

    NgApexchartsModule,
  ],

  providers: [HeaderComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
