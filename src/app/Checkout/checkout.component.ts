import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { User } from '../Registration/user';
import { Order } from './order';
import { Router } from '@angular/router';
import { CartService } from "../Cart/cart.service";
import { CartComponent } from "../Cart/cart.component";
import { LoginService } from '../Login/login.service';

declare var paypal: any;

@Component({
    selector: 'checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.css'],
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


    constructor(private checkoutService: CheckoutService, private router: Router, private cartComponent: CartComponent, private loginService: LoginService) {}

    


    ngOnInit(): void {
        console.log(LoginService.token);
        this.checkoutService.getAddress(LoginService.token).subscribe(user => this.user = user, error => this.errorMessage = <any>error);

    }
    

    valamilyenneven(): void{
        if (this.checked == false) {
            this.addressOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.user.address, this.user.city, this.user.region, this.user.postalCode, this.user.country);
            this.checkoutService.postOrder(this.addressOrder).subscribe((response) => {
            if(response._body === "Order added to Database") {
                alert("Your order has been recorded.")
                this.router.navigate(["payment"])
            } else {
                alert(response._body);
            }
            });
        } else {
            if (this.deliverycountry==null || this.deliverycity==null || this.deliveryregion==null || this.deliveryaddress==null || this.deliverypostalcode==null ){
                alert("You must fill out all field.");
            } else {
            this.deliveryOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.deliveryaddress, this.deliverycity, this.deliveryregion, this.deliverypostalcode, this.deliverycountry);
            this.checkoutService.postOrder(this.deliveryOrder).subscribe((response) => {
            if(response._body === "Order added to Database") {
                alert("Your order has been recorded.")
                this.router.navigate(["payment"])
            } else {
                alert(response._body);
            }
            });
        }
    }

    }

    onBack(): void{
        this.router.navigate(['/products']);
    }
}