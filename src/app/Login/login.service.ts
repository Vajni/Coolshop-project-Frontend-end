import {Injectable} from '@angular/core';
import { Observable } from "rxjs/Observable";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()

export class LoginService {
  isLoggedIn: boolean;


  constructor(private _http: Http, private router: Router) {

  }

  login(email, password) {
    let data = new URLSearchParams();
    data.append("email", email);
    data.append("password", password);

    this._http.post("http://localhost:8080/CoolShop-1.0/rest/user/login", data)
    .map(response => response.json())
      .subscribe(data => {
        this.router.navigate(["products"]);
      },
      error => {
        console.log(error.json());

      }
    )

  }
}
