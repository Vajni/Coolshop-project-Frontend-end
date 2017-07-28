import {Component} from '@angular/core';
import { IProduct } from "../Products/product";
import {MerchantService} from "./merchant.service";

@Component({
    
    templateUrl: 'merchant.component.html',
    styleUrls: ['merchant.component.css']
})
export class MerchantComponent{

    product : IProduct = new IProduct();
    stringProduct : string;

    constructor(private _merchantService: MerchantService){

    }

    onSubmit(){
       return this._merchantService.postJSON(this.product)
       .subscribe(data => this.stringProduct = JSON.stringify(data),error => alert(error),
       () => console.log('Finished'));
    }
}