import {Input} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';

import {Product} from '../MerchantPage/product';
import {HTTPWrapper} from "../HTTPWrapper/wrapper.service";

@Injectable()
export class MerchantSelectorService {
    constructor(private _httpWrapper: HTTPWrapper) {
    }

    @Input()
    private product: Product;
    private _updateProductURL = 'http://localhost:8080/CoolShop-1.0/rest/mp/updateProduct';

    updateProd(product: Product): Observable<any> {
        console.log(product);
        let productID = product.productID;
        return this._httpWrapper.post(product, this._updateProductURL);
    }
}