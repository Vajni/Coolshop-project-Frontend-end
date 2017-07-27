import { AppRoutingModule, routingComponents } from './app.routing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {ProductListComponent} from './Products/product-list.component';
import {FormsModule} from "@angular/forms";
import {ProductFilterPipe} from "./Products/product-filter.pipe";
import { StarComponent } from './Shared/star.component';
import { LoginComponent } from './Login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './Login/login.service';
//import { ProductDetailComponent } from "./Products/product-detail.component";

import {RegistrationComponent} from './Registration/registration.component';
import { RegistrationService } from './Registration/registration.service';

@NgModule({
   imports: [
     BrowserModule,
     AppRoutingModule,
     HttpModule,
     FormsModule,
     RouterModule,
     HttpClientModule,
     RouterModule.forRoot([
       {path: "login", component: LoginComponent},
       {path: "register", component: RegistrationComponent}
     ])
   ],
   declarations: [
     AppComponent,
     routingComponents,
     AppComponent,
     ProductListComponent,
     ProductFilterPipe,
     StarComponent,
     LoginComponent,
     RegistrationComponent,
     //ProductDetailComponent
    ],
   bootstrap: [ AppComponent ]
 })
export class AppModule { }
