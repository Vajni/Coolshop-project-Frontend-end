import { Injectable } from "@angular/core";
import { IProduct } from "../Products/product";
import { Observable } from "rxjs/Observable";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { StorageService } from "../Storage/storage.service";
import { MerchantComponent } from "./merchant.component";

@Injectable()
export class MerchantService {

    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/ProductList/addProductToDatabase'

    constructor(private _http: Http, private _storageService : StorageService){

    }

    postJSON(product : IProduct, userId : number){
    
        var details = {userId : userId,
                       productName: product.productName,
                       productType: product.productType,
                       productBrand: product.productBrand,
                       productDescription: product.productDescription,
                       productPrice: product.productPrice,
                       productQuantity: product.productQuantity,
                       unitsOnOrder: 0,
                       available: product.available,
                       imageName : product.productName,
                       reOrderLevel: product.reOrderLevel}
        
        var formData = new FormData();
        
        formData.append('details', new Blob([JSON.stringify(details)], {
        type: 'application/json'
        })), 
        
        formData.append('file', document.getElementById('productPicture')['files'][0]);
        console.log(details);
        let token = <string>this._storageService.read("token");
        let headers = new Headers();
        headers.append("X-token", token);
        
        return this._http.post(this._productUrl , formData, { headers : headers })
        .map(res => res.json());
    }
    
}

