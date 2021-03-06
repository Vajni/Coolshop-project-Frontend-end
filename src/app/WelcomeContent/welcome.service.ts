import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { IProduct } from "../Products/product";

@Injectable()
export class WelcomeService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/randomProducts';

    constructor(private _http: Http){
    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
        .map((response: Response)=><IProduct[]>response.json())
        .catch(this.handleError);
    }
      
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

}