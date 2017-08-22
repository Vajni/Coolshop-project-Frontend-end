import {Injectable} from '@angular/core';
import { Observable } from "rxjs/Observable";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { StorageService } from '../Storage/storage.service';

@Injectable()

export class LoginService {
  static token: string;

  constructor(private _http: Http, private router: Router, private _storage: StorageService) {

  }

  login(email, password): Observable<boolean> {
    let data = new URLSearchParams();
    data.append("email", email);
    data.append("password", password);

    return this._http.post("http://localhost:8080/CoolShop-1.0/rest/user/login", data)
      .map(response => this.check(response.json()));
  }

  check(data): boolean {
    if (data.login == "true") {
      LoginService.token = data.token;
      console.log(LoginService.token);
      return true;
    }
    else {
      return false;
    }
  }

  logout(): Observable<boolean> {
    let data = new URLSearchParams();
    data.append("token", LoginService.token);
    return this._http.post("http://localhost:8080/CoolShop-1.0/rest/user/logout", data)
      .map(response => this.check(response.json()));
  }

   isLoggedIn(): boolean {
    let localToken = this._storage.read("token");
    return localToken != null;
  }

}
