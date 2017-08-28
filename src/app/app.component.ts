import { Component, OnInit } from '@angular/core';
import { ProductService } from './Products/product.service';
import { LoginService } from './Login/login.service';
import { StorageService } from './Storage/storage.service';
import { Router } from '@angular/router';
import { CheckoutService } from './Checkout/checkout.service';
import { User } from './RoleManagement/user';

@Component({
  selector : 'pm-app',
  templateUrl: 'app.component.html',
  providers : [ProductService]
})
export class AppComponent implements OnInit {
  snippets = {
    userButton: {
      texts: {
        "logged_out": "Sign in",
        "logged_in": "Sign out"
      },
      urls: {
        "logged_out": "/login",
        "logged_in": ""
      },
      clickfuncs: {
        "logged_out": "test()",
        "logged_in": "logout()"
      }
    },
    regAndManagementButton: {
      texts: {
        "logged_out": "Sign up",
        "logged_in": "",
        "logged_in_merchant": "",
        "logged_in_admin": "ManageRoles"
      },
      urls: {
        "logged_out": "/register",
        "logged_in": "",
        "logged_in_merchant": "",
        "logged_in_admin": "/rolemanagement"
      },
      clickfuncs: {
        "logged_out": "",
        "logged_in": "",
        "logged_in_merchant": "",
        "logged_in_admin": ""
      }
    }
  };

  user: User;
  errorMessage: string;

  userButtonClick = this.snippets.userButton.clickfuncs["logged_out"];
  userButtonText = this.snippets.userButton.texts["logged_out"];
  userButtonUrl = this.snippets.userButton.urls["logged_out"];

  rmButtonClick = this.snippets.regAndManagementButton.clickfuncs["logged_out"];
  rmButtonText = this.snippets.regAndManagementButton.texts["logged_out"];
  rmButtonUrl = this.snippets.regAndManagementButton.urls["logged_out"];


  ngOnInit(): void {
      console.log(<string>this._storage.read("token"))
      this.checkoutService.getAddress(<string>this._storage.read("token")).subscribe(user => this.user = user, error => this.errorMessage = <any>error);
      this.login();
      alert("OnInit: -> " + this.user);
  }

  constructor(private loginService: LoginService, private _storage: StorageService, private _router: Router,
              private checkoutService: CheckoutService) {
    let token = this._storage.read("token");
    console.log("Detected token: " + token);
    if (token != null) {
      this.login();
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

  changeUserButton(to: string) {
    this.userButtonClick = this.snippets.userButton.clickfuncs[to];
    this.userButtonText = this.snippets.userButton.texts[to];
    this.userButtonUrl = this.snippets.userButton.urls[to];
  }

  changeRegAndManageButton(to: string) {

  }

  login() {
    if (this.user != undefined) {
      alert("OKsi");
      let role = this.user.role;
      alert("Role: " + role);
      this.changeUserButton("logged_in");
      switch(role) {
        case "user":
          this.changeRegAndManageButton("logged_in");
          break;
        case "merchant":
          alert("You are a merchant");
          this.changeRegAndManageButton("logged_in_merchant");
          break;
        case "admin":
          alert("You are an ADMIN");
          this.changeRegAndManageButton("logged_in_admin");
          break;
        default: break;
      }
    }
    else {
      alert("shit");
    }
  }

  logout() {
    this.loginService.logout();
    this.changeUserButton("logged_out");
  }

  logged_in(): boolean {
    let logged_in = this._storage.read("token");
    return logged_in != null;
  }

}
