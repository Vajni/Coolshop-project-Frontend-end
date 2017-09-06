import { Component, OnInit, HostBinding } from "@angular/core";
import { IProduct} from "./product";
import { ActivatedRoute, Router } from "@angular/router"
import { ProductService } from "./product.service"
import { Subscription } from 'rxjs/Subscription';
import { CartComponent } from "../Cart/cart.component";
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

declare var paypal: any;

@Component({
    selector: 'pm-details',
    templateUrl:"product-detail.component.html",
    styleUrls: ["product-details.component.css"],
    animations: [trigger('pictureAnimation', [
        state('small', style({
          transform: 'scale(1)'
        })),
        state('large', style({
          transform: 'scale(1.5)'
        })),
        transition('small <=> large', animate('600ms ease-in'))
      ]),
    ]
})


export class ProductDetailComponent implements OnInit{

@HostBinding('class') ProductListClass = 'pm-details';

    pageTitle: string = 'Product Details';
    product : IProduct;
    errorMessage : string;
    private sub : Subscription;
    state : string = 'small';
   
    constructor(private _httpWrapper : HTTPWrapper, private _productService : ProductService, private _route: ActivatedRoute, private _router: Router, private cartComponent: CartComponent){
        
    }
 

    ngOnInit(): void{
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
        });
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

    addToTotalPrice(productPrice: number) {
    this.cartComponent.addToTotalPrice(productPrice);
    }

    checkIfAdded(product: IProduct) {
    this.cartComponent.checkIfAdded(product);
    }

    animateSize(){
        this.state = (this.state === 'small' ? 'large' : 'small');
      }

}

