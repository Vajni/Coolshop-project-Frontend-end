import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import {LoginService} from '../Login/login.service';
import {Product} from './product';
import {HTTPWrapper} from "../HTTPWrapper/wrapper.service";
import {StorageService} from '../Storage/storage.service';

@Injectable()
export class MerchantPageService {
    
    private _getProductURL = 'http://localhost:8080/CoolShop-1.0/rest/mp/getProducts/';

    constructor(private _wrapper : HTTPWrapper, private _storageService: StorageService) {
    }

    getProducts(): Observable<Product[]>{
        //Két új sor
        let data = new URLSearchParams();
        data.append("token", <string>this._storageService.read("token"));
        //eddig
        return this._wrapper.post(data, this._getProductURL)
        .map((response: Response) => <Product[]>response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}