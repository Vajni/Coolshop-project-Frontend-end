import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {ProductListComponent} from './Products/product-list.component';
import {FormsModule} from "@angular/forms";
import {ProductFilterPipe} from "./Products/product-filter.pipe";
import { StarComponent } from './Shared/star.component';
import { ProductDetailComponent } from "./Products/product-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    ProductDetailComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductListComponent},
      {path: 'product/:id', component: ProductDetailComponent}
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
