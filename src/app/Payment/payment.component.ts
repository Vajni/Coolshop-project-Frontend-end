import { Component, OnInit } from '@angular/core';
import { User } from '../Registration/user';
import { Router } from '@angular/router';
import { CartService } from "../Cart/cart.service";
import { CartComponent } from "../Cart/cart.component";
import { LoginService } from '../Login/login.service';

import { CheckoutComponent } from '../Checkout/checkout.component';
import { CheckoutService} from '../Checkout/checkout.service';
import { StorageService } from "../Storage/storage.service";
import { Order } from "../Checkout/order";

declare var paypal: any;

@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css'],
    providers: [CheckoutComponent]
})

export class PaymentComponent implements OnInit{

    cardNumber: number;
    cardHolder: string;
    expiryDate: string;
    securityCode: string;
    errorMessage: string;


    constructor(private cartService: CartService, private router: Router, private checkoutComponent: CheckoutComponent, private checkoutService: CheckoutService, private storageService: StorageService) {}

    totalPrice = this.cartService.totalPrice.toFixed(2);

    ngOnInit(): void{
            this.checkoutService.getAddress(<string>this.storageService.read("token")).subscribe(user => this.checkoutService.user = user, error => this.checkoutService.errorMessage = <any>error);
            console.log(this.checkoutService.user.userID)
            var price = this.totalPrice;
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
                            amount: { total: price, currency: 'USD' }
                        }
                    ]
                }
            });
        },

            onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(payment) {

                alert("The payment is complete!");
                this.clearTheCart();
                this.router.navigate(["welcome"]);

                // You can now show a confirmation message to the customer
                });
            }


        }, '#paypal-button');

        console.log(CheckoutService.orderList)
    
    }

    checkCreditCardinfos(): void {
        let orderList: Array<Order> = new Array();
        if (this.cardNumber == null || this.cardHolder == null || this.expiryDate == null || this.securityCode == null) {
            alert("You must be fill out all field.")
        } else if(this.cartService.totalPrice == 0){
            alert("Something went wrong. Now you redirected to Productlist.")
            this.router.navigate(["products"])
        }else {
            for(let order of CheckoutService.orderList){
                orderList.push(order);
            }

            this.checkoutService.checkQuantityInDB(orderList).subscribe(data => {
                if(data._body == "true"){
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!AMI VISSZAJÖN DATA: " + data);
                    this.checkoutService.postOrder(orderList, this.totalPrice, this.cardNumber).subscribe();
                    alert("Thanks for your vásárlás.")
                    this.clearTheCart();
                    this.router.navigate(["welcome"]);
                } else {
                    alert("We don't have enough product.Please decsrease the product quantity. Now you'll redirect to homepage.")
                    this.router.navigate(["products"]);
                }
            });
            
        }
    }

    clearTheCart(): void{
        this.cartService.orderedProducts = new Array();
        this.cartService.totalPrice = 0;
        this.checkoutComponent.orderedProducts = new Array();
        CheckoutService.orderList = new Array();
    }
}