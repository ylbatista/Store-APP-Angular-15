import { NgModule } from '@angular/core';

import { BuyCarComponent } from './buy-car/buy-car.component';
import { ListComponent } from './list/list.component';
import { PNotFoundComponent } from './p-not-found/p-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowUserOrdersComponent } from './show-user-orders/show-user-orders.component';

const routes: Routes = [

  { path: 'buy-car', component: BuyCarComponent },
  { path: 'list', component: ListComponent },
  { path: 'show-user-orders', component: ShowUserOrdersComponent },
  { path: 'p-not-found', component: PNotFoundComponent },

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
