import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";


@Injectable()
export class AdminService{

    constructor(private _httpWrapper : HTTPWrapper){}

    checkLogin(email, password): Observable<boolean> {
        let json = {email : email, password : password};
        return this._httpWrapper.post(json, "http://localhost:8080/CoolShop-1.0/rest/admin/checkRole")
          .map(response => response.json(), console.log(json));
      }
}