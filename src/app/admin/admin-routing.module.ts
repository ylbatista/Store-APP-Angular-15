
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

//PRODUCT MODULE
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { DetailProductComponent } from './products/detail-product/detail-product.component';
import { FullListComponent } from './products/full-list/full-list.component';

//USERS MODULE
import { UsersListComponent } from './users/users-list/users-list.component';

//componentes PRODUCT y componente USERS
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { MonthSalesGraficComponent } from './dashboard/dashboard-components/month-sales-grafic/month-sales-grafic.component';
import { GraficsComponent } from './dashboard/dashboard-components/grafics/grafics.component';
import { HeaderComponent } from '../layout/header/header.component';
import { RegisterComponent } from '../auth/register/register.component';
import { CardsUserComponent } from './dashboard/dashboard-components/cards-user/cards-user.component';
import { GraficYearsComponent } from './dashboard/dashboard-components/grafics-year/grafic-year.component';


//ORDERS
const routes: Routes = [

  { path:'dashboard', component: DashboardComponent },

  { path:'products', component: ProductsComponent },

  { path: 'add-product', component: AddProductComponent },
  { path: 'full-list', component: FullListComponent },
  { path: 'detail-product', component: DetailProductComponent },

  { path:'users', component: UsersComponent },

  { path: 'users-list', component: UsersListComponent },
  { path: 'users-edit', component: UsersEditComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'orders', component: OrdersComponent },

  { path: 'all-orders', component: AllOrdersComponent },

  { path: 'month-sales-grafic', component: MonthSalesGraficComponent },
  { path: 'grafics', component: GraficsComponent },
  { path:'app-grafic-year', component: GraficYearsComponent },
  { path:'cards-user', component: CardsUserComponent },

  // { path: 'header', component: HeaderComponent },

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
