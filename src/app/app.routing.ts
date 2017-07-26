import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { ThirdComponent } from './third.component';

import { LoginComponent } from './Login/login.component';
import { ProductListComponent } from './Products/product-list.component';

 const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'pm-products' },

   { path: 'first', component: FirstComponent },
   { path: 'second', component: SecondComponent },
   { path: 'third', component: ThirdComponent },

   { path: 'login', component: LoginComponent },
   { path: 'products', component: ProductListComponent }
 ];

 @NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
 })
 export class AppRoutingModule { }

 export const routingComponents = [
   FirstComponent,
   SecondComponent,
   ThirdComponent,
   LoginComponent,
   ProductListComponent
 ];
