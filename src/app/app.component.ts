import { Component } from '@angular/core';
import { ProductService } from "./Products/product.service";

@Component({
  selector : 'pm-app',
  template : '<div><pm-products></pm-products></div>',
  providers : [ProductService]
})
export class AppComponent{
  
}

