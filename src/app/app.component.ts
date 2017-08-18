import { Component } from '@angular/core';
import { ProductService } from './Products/product.service';


@Component({
  selector : 'pm-app',
  templateUrl: 'app.component.html',
  providers : [ProductService]
})
export class AppComponent{
  static texts = {
    "logged_out": "Sign in",
    "logged_in": "Sign out"
  };
  static urls = {
    "logged_out": "/login",
    "logged_in": ""
  };
  static clickfuncs = {
    "logged_out": "",
    "logged_in": "(click=\"logout()\")"
  };

  randomtext = "asd";
  static clickfunc = AppComponent.clickfuncs["logged_out"];
  static userButtonText = AppComponent.texts["logged_out"];
  static userButtonUrl = AppComponent.urls["logged_out"];

  get staticClickFunc(): string {
    return AppComponent.clickfunc;
  }

  get staticUserButtonText(): string {
    return AppComponent.userButtonText;
  }

  get staticUserButtonUrl(): string {
    return AppComponent.userButtonUrl;
  }

  static login() {

  }

  static logout() {

  }

}
