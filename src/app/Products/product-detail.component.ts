import { Component, OnInit } from "@angular/core";
import { IProduct} from "./product";
import { ActivatedRoute, Router } from "@angular/router"
import { ProductService } from "./product.service"
import { Subscription } from 'rxjs/Subscription';

declare var paypal: any;

@Component({
    templateUrl:"product-detail.component.html",
    styleUrls: ["product-details.component.css"]
})


export class ProductDetailComponent implements OnInit{
    pageTitle: string = 'Product Details';
    product : IProduct;
    errorMessage : string;
    private sub : Subscription;
    constructor(private _productService : ProductService, private _route: ActivatedRoute, private _router: Router){

    }

    ngOnInit(): void{
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
        });
        
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

    onBack(): void{
        this._router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onAddToCart(){
        this._router.navigate(['/products'])
    }

}

