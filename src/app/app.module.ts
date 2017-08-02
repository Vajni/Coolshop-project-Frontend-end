//import { AppRoutingModule, routingComponents } from './app.routing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './Products/product-list.component';
import { FormsModule } from "@angular/forms";
import { ProductFilterPipe } from "./Products/product-filter.pipe";
import { StarComponent } from './Shared/star.component';
import { LoginComponent } from './Login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './Login/login.service';

import {RegistrationComponent} from './Registration/registration.component';
import { RegistrationService } from './Registration/registration.service';

import { ProductDetailComponent } from "./Products/product-detail.component";
import { WelcomeContent } from "./WelcomeContent/welcome.component";
import { MerchantComponent } from "./Merchant/merchant.component";
import { MerchantService } from "./Merchant/merchant.service";

import { RoleManagementComponent } from './RoleManagement/rolemanagement.component';
import { RoleSelectorComponent } from './RoleSelector/roleselector.component';
import { RoleManagementService } from './RoleManagement/rolemanagement.service';
import { RoleSelectorService } from './RoleSelector/roleselector.service';

import { CheckoutComponent } from './Checkout/checkout.component';
import { CheckoutService } from './Checkout/checkout.service';
import { User } from './Registration/user';


@NgModule({
   imports: [
     BrowserModule,
     //AppRoutingModule,
     HttpModule,
     FormsModule,
     RouterModule,
     HttpClientModule,
     RouterModule.forRoot([
       //{path: "", pathMatch: "full", redirectTo: "products"},
       {path: "login", component: LoginComponent},
       {path: "register", component: RegistrationComponent},
       {path: "products", component: ProductListComponent},
       {path: 'product/:id', component: ProductDetailComponent},
       {path: 'welcome', component: WelcomeContent},
       {path: 'merchant', component: MerchantComponent},
       {path: 'rolemanagement', component: RoleManagementComponent},
       {path: 'checkout', component: CheckoutComponent}
     ])
   ],
   declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeContent,
    MerchantComponent,
    RoleManagementComponent,
    RoleSelectorComponent,
    CheckoutComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [RoleManagementService, RoleSelectorService, MerchantService, CheckoutService],
})
export class AppModule { }
