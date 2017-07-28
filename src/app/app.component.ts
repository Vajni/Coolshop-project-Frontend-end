import { Component } from '@angular/core';
import { ProductService } from './Products/product.service';


@Component({
  selector : 'pm-app',
  templateUrl : 'app.component.html',
  providers : [ProductService]
})
export class AppComponent{
  
}
