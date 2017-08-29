import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {LoginService} from '../Login/login.service';
import {Product} from './product';
import {HTTPWrapper} from "../HTTPWrapper/wrapper.service";

@Injectable()
export class MerchantPageService {
    
    private _getProductURL = 'http://localhost:8080/CoolShop-1.0/rest/mp/getProducts/' + LoginService.role +'';

    constructor(private _loginService: LoginService, private _wrapper : HTTPWrapper) {
    }

    getProducts(): Observable<Product[]>{
        return this._wrapper.get(this._getProductURL)
        .map((response: Response) => <Product[]>response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    testMehtod() {
        console.log(LoginService.role);
    }
}