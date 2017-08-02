import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { User } from '../Registration/user';
import { Order } from './order';

@Component({
    selector: 'checkout',
    templateUrl: 'checkout.component.html',
    providers: [CheckoutService]

})
export class CheckoutComponent implements OnInit{

    errorMessage: string;
    user: User;
    checked: boolean = false;
    deliverycountry: string;
    deliverycity: string;
    deliveryregion: string;
    deliveryaddress: string;
    deliverypostalcode: string;
    today: Date = new Date();
    requiredDate: Date = new Date("February 10, 2017 10:10:00");
    shippedDate: Date = new Date("February 8, 2017 20:10:00");
    addressOrder: Order;
    deliveryOrder: Order;


    constructor(private checkoutService: CheckoutService) {}

    


    ngOnInit(): void {
        this.checkoutService.getAddress().subscribe(user => this.user = user, error => this.errorMessage = <any>error);
        this.addressOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.user.address, this.user.city, this.user.region, this.user.postalCode, this.user.country);
    }

    valamilyenneven(): void{
        if (this.checked == false) {
            this.addressOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.user.address, this.user.city, this.user.region, this.user.postalCode, this.user.country);
            this.checkoutService.postOrder(this.addressOrder).subscribe((response) => alert(response._body));
        } else {
            if (this.deliverycountry==null || this.deliverycity==null || this.deliveryregion==null || this.deliveryaddress==null || this.deliverypostalcode==null ){
                alert("You must fill out all field.");
            } else {
            this.deliveryOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.deliveryaddress, this.deliverycity, this.deliveryregion, this.deliverypostalcode, this.deliverycountry);
            this.checkoutService.postOrder(this.deliveryOrder).subscribe((response) => alert(response._body));
            }
        }
    }


 }