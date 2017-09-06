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
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";
import { CartService } from '../Cart/cart.service';

@Injectable()
export class CheckoutService{
    static orderList: Array<Order> = new Array;

    constructor(private _httpWrapper: HTTPWrapper, private storageService: StorageService, private cartService: CartService){

    }

    errorMessage: string;
    user: User = new User(1, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a");
    uDate: Date = new Date();
    deliverycountry: string = "";
    deliverycity: string = "";
    deliveryregion: string = "";
    deliveryaddress: string = "";
    deliverypostalcode: string = "";
    addressOrder: Order = new Order(0, 0, 0, 0, this.uDate, this.uDate, this.uDate, "a", "a", "a", "a", "a", "a");

    getAddress(token: string): Observable<User> {
        let data = new URLSearchParams();
        data.append("token", <string>this.storageService.read("token"));
        return this._httpWrapper.post(data,"http://localhost:8080/CoolShop-1.0/rest/checkout/getAddressInformations")
            .map((response: Response)=><User>response.json());
    }

    postOrder(order: Order[], totalPrice: string, cardNumber: number): Observable<any>{
        var data = {"order": order, "totalPrice": totalPrice, "cardNumber": cardNumber}
        return this._httpWrapper.post(data, "http://localhost:8080/CoolShop-1.0/rest/order/addToDatabase");

    }

    checkQuantityInDB(order: Order[]): Observable<any>{
        var data = {"order": order};
        return this._httpWrapper.post(data, "http://localhost:8080/CoolShop-1.0/rest/check/checkQuantity");
    }
}
