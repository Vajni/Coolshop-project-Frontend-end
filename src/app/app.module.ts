//import { AppRoutingModule, routingComponents } from './app.routing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './Products/product-list.component';
import { FormsModule } from "@angular/forms";
import { ProductFilterPipeProduct } from "./Products/product-filter-product.pipe";
import { ProductFilterPipeSupplier } from "./Products/product-filter-supplier.pipe";
import { ProductFilterPipeType } from "./Products/product-filter-type.pipe";
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
import { ProductDetailGuard } from "./Products/product-guard.service";

import { RoleManagementComponent } from './RoleManagement/rolemanagement.component';
import { RoleSelectorComponent } from './RoleSelector/roleselector.component';
import { RoleManagementService } from './RoleManagement/rolemanagement.service';
import { RoleSelectorService } from './RoleSelector/roleselector.service';


@NgModule({
   imports: [
     BrowserModule,
     HttpModule,
     FormsModule,
     RouterModule,
     HttpClientModule,
     RouterModule.forRoot([
       {path: "", pathMatch: "full", redirectTo: "welcome"},
       {path: "login", component: LoginComponent},
       {path: "register", component: RegistrationComponent},
       {path: "products", component: ProductListComponent},
       {path: 'product/:id', canActivate : [ProductDetailGuard], component: ProductDetailComponent},
       {path: 'welcome', component: WelcomeContent},
       {path: 'merchant', component: MerchantComponent},
       {path: 'rolemanagement', component: RoleManagementComponent}
     ])
   ],
   declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProductListComponent,
    ProductFilterPipeProduct,
    ProductFilterPipeSupplier,
    ProductFilterPipeType,
    StarComponent,
    ProductDetailComponent,
    WelcomeContent,
    MerchantComponent,
    RoleManagementComponent,
    RoleSelectorComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [RoleManagementService, RoleSelectorService, MerchantService, ProductDetailGuard]
})
export class AppModule { }
