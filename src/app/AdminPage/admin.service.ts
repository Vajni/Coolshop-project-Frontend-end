import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";


@Injectable()
export class AdminService{

    constructor(private _httpWrapper : HTTPWrapper){}

    getLogs(): Observable<any>{
        return this._httpWrapper.get("http://localhost:8080/CoolShop-1.0/rest/admin/getLogs").map(resp => resp.json());
    }
}