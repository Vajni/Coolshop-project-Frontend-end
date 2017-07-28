import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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

  constructor(private _service: LoginService, private _router: Router) {

  }

  sendClicked() {
    this._service.login(this.email, this.password).subscribe(success => {
      if (success) {
        this._router.navigate(["products"]);
      }
      else {
        this.hidden = "";
      }
    })
  }
}
