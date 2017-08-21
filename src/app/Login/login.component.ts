import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { StorageService } from '../Storage/storage.service';

@Component({
  selector: 'login',
  templateUrl: '../Login/login.component.html',
  providers: [LoginService]
})
export class LoginComponent {
  backgroundColor: string = "c45f2ad";
  email: string;
  password: string;
  localUser = {
    email: "",
    password: ""
  }
  hidden: string = "warning-hidden";

  constructor(private _service: LoginService, private _router: Router, private _app: AppComponent, private _storage: StorageService) {

  }

  sendClicked() {
    this._service.login(this.email, this.password).subscribe(success => {
      if (success) {
        this._app.login();
        this._storage.write("token", LoginService.token);
        this._app.login();
        this._router.navigate(["products"]);
      }
      else {
        this.hidden = "";
      }
    })
  }
}
