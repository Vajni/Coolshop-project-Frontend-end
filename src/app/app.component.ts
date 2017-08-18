import { Component, HostBinding } from '@angular/core';
import { ProductService } from './Products/product.service';


@Component({
  selector : 'pm-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers : [ProductService]
})
export class AppComponent{
/*
**This is how you give css selector to a @Component selector ->
*/
@HostBinding('class') AppComponentClass = 'pm-app';
}
