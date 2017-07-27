import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: '../Login/login.component.html',
  providers: [LoginService]
  //template: "<h1>Login</h1><hr>This is the login page!"
})
export class LoginComponent {
  backgroundColor: string = "c45f2ad";
  email: string;
  password: string;
  localUser = {
    email: "",
    password: ""
  }

  constructor(private _service: LoginService, private _router: Router) {

  }

  sendClicked() {
    this._service.login(this.email, this.password);
    //this._service.loginfn({email: this.email, password: this.password}).then((res) => {})
    //alert(this._httpService.getLogin());
    //alert("fasz: " + this.email + " : " + this.password);
    //return this._http.post("http://localhost:8080/service/user/login", '{"asd": "asd"}');
  }
}
