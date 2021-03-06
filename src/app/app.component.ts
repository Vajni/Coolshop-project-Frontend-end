import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductService } from './Products/product.service';
import { LoginService } from './Login/login.service';
import { StorageService } from './Storage/storage.service';
import { Router } from '@angular/router';
import { CheckoutService } from './Checkout/checkout.service';
import { User } from './RoleManagement/user';

@Component({
  selector : 'pm-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
        "logged_in_merchant": "Merchant page",
        "logged_in_admin": "ManageRoles"
      },
      urls: {
        "logged_out": "/register",
        "logged_in": "",
        "logged_in_merchant": "/mp",
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
  userJSON: JSON;

  userButtonClick = this.snippets.userButton.clickfuncs["logged_out"];
  userButtonText = this.snippets.userButton.texts["logged_out"];
  userButtonUrl = this.snippets.userButton.urls["logged_out"];

  rmButtonClick = this.snippets.regAndManagementButton.clickfuncs["logged_out"];
  rmButtonText = this.snippets.regAndManagementButton.texts["logged_out"];
  rmButtonUrl = this.snippets.regAndManagementButton.urls["logged_out"];

  userNameText = "";
  roleIsAdmin: boolean = false;

  ngOnInit(): void {
      this.setUser();
      if (this.logged_in()) {
        this.login();
      }
  }

  constructor(private loginService: LoginService, private _storage: StorageService, private _router: Router,
              private checkoutService: CheckoutService) {
    let token = this._storage.read("token");
    if (token != null) {
      this.login();
    }
  }

  setUser() {
    this.checkoutService.getAddress(<string>this._storage.read("token")).subscribe(user => this.user = user, error => this.errorMessage = <any>error);
  }

  userButtonClicked(): void {
    if (this.logged_in()) {
      this._storage.write("token", null);
      this.logout();
    }
  }

  changeUserButton(to: string) {
    this.userButtonClick = this.snippets.userButton.clickfuncs[to];
    this.userButtonText = this.snippets.userButton.texts[to];
    this.userButtonUrl = this.snippets.userButton.urls[to];
  }

  changeRegAndManageButton(to: string) {
      this.rmButtonClick = this.snippets.regAndManagementButton.clickfuncs[to];
      this.rmButtonText = this.snippets.regAndManagementButton.texts[to];
      this.rmButtonUrl = this.snippets.regAndManagementButton.urls[to];
  }

  login() {
    this.changeUserButton("logged_in");
    if (this.user == undefined) {
      this.setUser();
    }
    let userDatas;
    userDatas = this.getUser();
  }

  logout() {
    this.loginService.logout();
    this.changeUserButton("logged_out");
    this.changeRegAndManageButton("logged_out");
    this.userNameText = "";
    this.roleIsAdmin = false;
  }

  logged_in(): boolean {
    return this.loginService.isLoggedIn();
  }

  getUser() {
      let logged_in = this.logged_in();
      let user;
      this.loginService.getUserData().subscribe(data => {
          this.userJSON = JSON.parse(JSON.stringify(data));
          if (this.userJSON == null) {
              this._storage.write("token", null);
          }
          if (!logged_in) {
              this._router.navigate(["login"]);
              alert("NOT LOGGED IN");
          }

          let role = this.userJSON["role"];
          switch(role) {
            case "user":
              this.changeRegAndManageButton("logged_in");
              break;
            case "merchant":
              this.changeRegAndManageButton("logged_in_merchant");
              break;
            case "admin":
              this.changeRegAndManageButton("logged_in_admin");
              break;
            default: break;
          }

          this.userNameText = "Logged in as " + this.userJSON["userName"];
          if (this.userJSON["role"] == "admin") {
              this.roleIsAdmin = true;
          }
      });
  }
}
