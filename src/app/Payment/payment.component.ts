import { Component, OnInit } from '@angular/core';
import { User } from '../Registration/user';
import { Router } from '@angular/router';
import { CartService } from "../Cart/cart.service";
import { CartComponent } from "../Cart/cart.component";
import { LoginService } from '../Login/login.service';

declare var paypal: any;

@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css']

})

export class PaymentComponent implements OnInit{

    cardNumber: number;
    cardHolder: string;
    expiryDate: string;
    securityCode: number;

    constructor(private cartService: CartService, private router: Router) {}

    totalPrice = this.cartService.totalPrice;

    ngOnInit(): void{

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

    checkCreditCardinfos(): void {
        if (this.cardNumber == null || this.cardHolder == null || this.expiryDate == null || this.securityCode == null) {
            alert("You must be fill out all field.")
        } else {
            alert("Thanks for your vásárlás.")
            this.router.navigate(["welcome"]);
        }
    }

}