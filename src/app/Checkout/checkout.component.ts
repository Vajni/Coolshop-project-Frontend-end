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

        paypal.Button.render({

            env: 'sandbox', // Or 'sandbox',
            
            client: {
            sandbox:    'ASw28Jwetd3OMa9dEnZ9bRELiMMhhPsXgfye9kqxbT4iRD5SxSu59DS-bI-kH-rE4JCZCV1NP8Uqrj_w',
            production: 'ASw28Jwetd3OMa9dEnZ9bRELiMMhhPsXgfye9kqxbT4iRD5SxSu59DS-bI-kH-rE4JCZCV1NP8Uqrj_w'
        },
            commit: true, // Show a 'Pay Now' button

            payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '2.00', currency: 'USD' }
                        }
                    ]
                }
            });
        },

            onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(payment) {

                alert("The payment is complete!");
                // You can now show a confirmation message to the customer
            });
        }


        }, '#paypal-button');
    }
    

    valamilyenneven(): void{
        if (this.checked == false) {
            this.addressOrder = new Order(0, this.user.userID, 1, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.user.address, this.user.city, this.user.region, this.user.postalCode, this.user.country);
            this.checkoutService.postOrder(this.addressOrder).subscribe((response) => {
            if(response._body === "Order added to Database") {
                alert("Your order has been recorded, now you will be redirected to Home page.")
                this.router.navigate(["products"])
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
                alert("Your order has been recorded, now you will be redirected to Home page.")
                this.router.navigate(["products"])
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