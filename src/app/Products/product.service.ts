
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable } from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

@Injectable()
export class ProductService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/Products'

    constructor(private _http: Http){

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
        .map((response: Response)=><IProduct[]>response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }
      
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }
    
}