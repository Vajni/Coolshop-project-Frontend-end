import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './Products/product-list.component';
import { FormsModule } from "@angular/forms";
import { ProductFilterPipe } from "./Products/product-filter.pipe";
import { StarComponent } from './Shared/star.component';
import { RoleManagementComponent } from './RoleManagement/rolemanagement.component';
import { RoleSelectorComponent } from './RoleSelector/roleselector.component';
import { RoleManagementService } from './RoleManagement/rolemanagement.service';
import { RoleSelectorService } from './RoleSelector/roleselector.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    RoleManagementComponent,
    RoleSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RoleManagementService, RoleSelectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
