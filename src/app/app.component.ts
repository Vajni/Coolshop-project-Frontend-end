import { Component } from '@angular/core';
import { ProductService } from './Products/product.service';
import { LoginService } from './Login/login.service';
import { StorageService } from './Storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector : 'pm-app',
  templateUrl: 'app.component.html',
  providers : [ProductService]
})
export class AppComponent{
  texts = {
    "logged_out": "Sign in",
    "logged_in": "Sign out"
  };
  urls = {
    "logged_out": "/login",
    "logged_in": ""
  };
  clickfuncs = {
    "logged_out": "test()",
    "logged_in": "logout()"
  };

  randomtext = "asd";
  userButtonClick = this.clickfuncs["logged_out"];
  userButtonText = this.texts["logged_out"];
  userButtonUrl = this.urls["logged_out"];

  constructor(private loginService: LoginService, private _storage: StorageService, private _router: Router) {
    let token = this._storage.read("token");
    console.log("Detected token: " + token);
    if (token != null) {
      this.login();
      this._router.navigate(["products"]);
    }
  }

  userButtonClicked(): void {
    console.log("User button clicked");
    if (this.logged_in()) {
      this._storage.write("token", null);
      this.logout();
    }
  }

  test() {
    console.log("ASDSADASDSAD");
  }

  login() {
    this.userButtonClick = this.clickfuncs["logged_in"];
    this.userButtonText = this.texts["logged_in"];
    this.userButtonUrl = this.urls["logged_in"];
  }

  logout() {
    this.loginService.logout();
    this.userButtonClick = this.clickfuncs["logged_out"];
    this.userButtonText = this.texts["logged_out"];
    this.userButtonUrl = this.urls["logged_out"];
  }

  logged_in(): boolean {
    let logged_in = this._storage.read("token");
    return logged_in != null;
  }

}
