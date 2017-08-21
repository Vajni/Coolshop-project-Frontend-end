import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../Registration/user';
import { Order } from './order'
import { LoginService } from '../Login/login.service';
import { URLSearchParams } from '@angular/http';
import { IProduct} from '../Products/product';
import { StorageService } from '../Storage/storage.service';

@Injectable()
export class CheckoutService{
    
    static checkoutProducts: Array<IProduct> = new Array; 

    constructor(private _http: Http, private storageService: StorageService){

    }

    getAddress(token: string): Observable<User> {
        let data = new URLSearchParams();
        data.append("token", <string>this.storageService.read("token"));
        return this._http.post("http://localhost:8080/CoolShop-1.0/rest/checkout/getAddressInformations", data).map((response: Response)=><User>response.json()).do(data => console.log(JSON.stringify(data)));
    }

    postOrder(order: Order): Observable<any>{
        return this._http.post("http://localhost:8080/CoolShop-1.0/rest/order/addToDatabase", order);
    } 
}