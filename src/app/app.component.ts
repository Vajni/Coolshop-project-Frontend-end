import { Component } from '@angular/core';
import { ProductService } from "./Products/product.service";

@Component({
  selector : 'pm-app',
  template : '<div><h1>{{pageTitle}}</h1><div>My first component</div><pm-products></pm-products></div>',
  providers : [ProductService]
})
export class AppComponent{
  pageTitle :string = "My first Angular application";
}

