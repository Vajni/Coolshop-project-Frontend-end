
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { StorageService } from "../Storage/storage.service";

@Injectable()
export class ProductService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/Products';

    constructor(private _http: Http, private _storageService : StorageService){
    }

    getProducts(): Observable<IProduct[]> {
        let token = <string>this._storageService.read("token");
        let headers = new Headers();
        headers.append("X-token", token);
        let options = new RequestOptions({headers : headers});
        return this._http.get(this._productUrl, options)
        .map((response: Response)=><IProduct[]>response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
        
    }
      
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    logName(userName: String) {
        console.log('userName: ' + userName);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }
}