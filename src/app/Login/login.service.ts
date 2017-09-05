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
import { CartService } from '../Cart/cart.service';
import { CheckoutService } from '../Checkout/checkout.service';
import { HTTPWrapper } from '../HTTPWrapper/wrapper.service';

@Injectable()

export class LoginService {
  static token: string;

  constructor(private _http: Http, private router: Router, private _storage: StorageService,
              private _cart: CartService, private checkoutService: CheckoutService, private wrapper: HTTPWrapper) {

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
      this._storage.write("token", data.token);
      console.log(LoginService.token + " <--> " + this._storage.read("token"));
      return true;
    }
    else {
      return false;
    }
  }

  logout(): Observable<boolean> {
    let token = this._storage.read("token");
    if (token != null) {
      let data = new URLSearchParams();
      data.append("token", /*LoginService.token*/ <string>this._storage.read("token"));
      this._cart.orderedProducts = new Array;
      this._storage.write("token", null);
      return this._http.post("http://localhost:8080/CoolShop-1.0/rest/user/logout", data)
        .map(response => this.check(response.json()));
    }
  }

   isLoggedIn(): boolean {
    let localToken = this._storage.read("token");
    return localToken != null;
  }

  getUserData() {
      let token = <string>this._storage.read("token");
      if (token != null || token != undefined) {
        let data = new URLSearchParams();
        data.append("token", token);
        //this._storage.write("token", LoginService.token);
        /*return this._http.get("http://localhost:8080/CoolShop-1.0/rest/user/get?token=" + token, data)
          .map(response => response.json());*/
         //let back = this.wrapper.get("http://localhost:8080/CoolShop-1.0/rest/user/get?token=" + token);
         let back2;
         let back = this.wrapper.post(data, "http://localhost:8080/CoolShop-1.0/rest/user/getuser")
            .map((response: Response)=> response.json()).do(data => {
                //alert("str: " + JSON.stringify(data));
                back2 = data;
            });
         //alert("BACK: " + back);
        return back;
      }
  }

}
