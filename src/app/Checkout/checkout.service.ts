import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../Registration/user';
import { Order } from './order'

@Injectable()
export class CheckoutService{
    

    constructor(private http: Http){

    }

    getAddress(): Observable<User> {
        console.log("VALAMI");
        return this.http.get("http://localhost:8080/CoolShop-1.0/rest/checkout/getAddressInformations").map((response: Response)=><User>response.json()).do(data => console.log(JSON.stringify(data)));
    }

    postOrder(order: Order): Observable<any>{
        return this.http.post("http://localhost:8080/CoolShop-1.0/rest/order/addToDatabase", order);
    } 
}