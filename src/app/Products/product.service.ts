
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { StorageService } from "../Storage/storage.service";
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

@Injectable()
export class ProductService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/Products';

    constructor(private _storageService : StorageService, private _wrapper : HTTPWrapper){
    }

    getProducts(): Observable<IProduct[]> {
        
        return this._wrapper.get(this._productUrl)
        .map((response: Response)=><IProduct[]>response.json())
        .catch(this.handleError);
        
    }
      
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productID === id));
    }
}