import { Injectable } from "@angular/core";
import { IProduct } from "../Products/product";
import { Observable } from "rxjs/Observable";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

@Injectable()
export class MerchantService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/addProductToDatabase'

    constructor(private _http: Http){

    }

    postJSON(product : IProduct){
        var details = {productName: product.productName,
                       productType: product.productType,
                       productBrand: product.productBrand,
                       productDescription: product.productDescription,
                       productPrice: product.productPrice,
                       productQuantity: product.productQuantity,
                       unitsOnOrder: 0,
                       imageName : product.productName,
                       reOrderLevel: product.reOrderLevel}
        var formData = new FormData();
        formData.append('details', new Blob([JSON.stringify(details)], {
        type: 'application/json'
        })), 
        formData.append('file', document.getElementById('productPicture')['files'][0]);
        var headers = new Headers();
        
        console.log(typeof product.productName);

        return this._http.post(this._productUrl , formData, { headers : headers })
        .map(res => res.json());
    }
    
}

