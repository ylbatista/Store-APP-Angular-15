import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //ruta principal de la app
  { path: 'home', component: HomeComponent },


  //ruta para carga lazy loading de auth
  { path: 'auth',
   loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) 
  },
  
  { path: 'admin',
   loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) 
  },

  { path: 'pages',
   loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)
  },

  { path:'**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
