import {Component} from '@angular/core';
import { IProduct } from "../Products/product";
import {MerchantService} from "./merchant.service";
import { StorageService } from "../Storage/storage.service";
import { CheckoutService } from "../Checkout/checkout.service";
import { User } from "../Registration/user";
import { FormGroup, FormControl } from "@angular/forms";


@Component({
    
    templateUrl: 'merchant.component.html',
    styleUrls: ['merchant.component.css']
})
export class MerchantComponent{

    product : IProduct = new IProduct();
    stringProduct : string;
    user : User;
    merchantForm = new FormGroup({
        productName: new FormControl(),
        productType: new FormControl(),
        productBrand: new FormControl(),
        productDescription: new FormControl(),
        productPrice: new FormControl(),
        productQuantity: new FormControl(),
        productReOrderLevel: new FormControl(),
        available: new FormControl(),
        productPicture: new FormControl()});


    

    constructor(private _merchantService: MerchantService, private _storageService : StorageService, private checkoutService : CheckoutService){

    }

    ngOnInit(){
        this.checkoutService.getAddress(<string>this._storageService.read("token")).
        subscribe(user => this.user = user, error => this.checkoutService.errorMessage = <any>error);
        console.log(this.user);
    }

    onSubmit(){
       this._merchantService.postJSON(this.product, this.user.userID)
       .subscribe(data => this.stringProduct = JSON.stringify(data),error => alert(error),
       () => alert('Your product has been uploaded successfuly.'));
       this.clearForm();
    }

    clearForm() :void {
        this.merchantForm.reset();
    }
}