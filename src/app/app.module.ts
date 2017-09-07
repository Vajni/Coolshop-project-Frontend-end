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
import { ProductService } from "./Products/product.service"

import { CheckoutComponent } from './Checkout/checkout.component';
import { CheckoutService } from './Checkout/checkout.service';
import { User } from './Registration/user';

import {CartComponent} from './Cart/cart.component';
import {CartService} from './Cart/cart.service';
import { WelcomeService } from "./WelcomeContent/welcome.service";

import { PaymentComponent } from './Payment/payment.component';

import { StorageService } from './Storage/storage.service';
import { HTTPWrapper } from "./HTTPWrapper/wrapper.service";
import { Admin } from "./AdminPage/admin.component";
import { AdminService } from "./AdminPage/admin.service";

import {MerchantPageComponent} from './MerchantPage/mp.component';
import {MerchantPageService} from './MerchantPage/mp.service';
import {MerchantSelectorComponent} from './MerchantSelector/ms.component';
import {MerchantSelectorService} from './MerchantSelector/ms.service';

import { ReactiveFormsModule } from '@angular/forms';
import { LogFilterPipeOrderDate } from "./AdminPage/admin-filter-orderdate.pipe";
import { LogFilterPipeOrderId } from "./AdminPage/admin-filter-orderid.pipe";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
   imports: [
    BrowserAnimationsModule,
     BrowserModule,
     ReactiveFormsModule,
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
       {path: 'rolemanagement', component: RoleManagementComponent},
       {path: 'checkout', component: CheckoutComponent},
       {path: 'payment', component: PaymentComponent},
       {path: 'mp', component: MerchantPageComponent},
       {path: 'admin', component: Admin}
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
    LogFilterPipeOrderDate,
    LogFilterPipeOrderId,
    StarComponent,
    ProductDetailComponent,
    WelcomeContent,
    MerchantComponent,
    RoleManagementComponent,
    RoleSelectorComponent,
    CheckoutComponent,
    CartComponent,
    PaymentComponent,
    MerchantPageComponent,
    MerchantSelectorComponent,
    Admin
  ],
  bootstrap: [ AppComponent ],
  providers: [RoleManagementService, RoleSelectorService, MerchantService, ProductDetailGuard, CheckoutService,ProductService, CartService, CartComponent, LoginService, StorageService, WelcomeService, HTTPWrapper, MerchantPageService, MerchantSelectorService,  AdminService]
})
export class AppModule { }
