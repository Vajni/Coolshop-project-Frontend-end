import { Component } from '@angular/core';
import { ProductService } from "./Products/product.service";

@Component({
  selector : 'pm-app',
  template : '<div><rolemanagement></rolemanagement></div>',
  providers : [ProductService]
})
export class AppComponent{
  pageTitle :string = "My first Angular application";
}

