import { Component, OnInit, HostBinding } from "@angular/core";
import { IProduct} from "./product";
import { ActivatedRoute, Router } from "@angular/router"
import { ProductService } from "./product.service"
import { Subscription } from 'rxjs/Subscription';
import { CartComponent } from "../Cart/cart.component";

declare var paypal: any;

@Component({
    selector: 'pm-details',
    templateUrl:"product-detail.component.html",
    styleUrls: ["product-details.component.css"]
})


export class ProductDetailComponent implements OnInit{

@HostBinding('class') ProductListClass = 'pm-details';

    pageTitle: string = 'Product Details';
    product : IProduct;
    errorMessage : string;
    private sub : Subscription;
 
   
    constructor(private _productService : ProductService, private _route: ActivatedRoute, private _router: Router, private cartComponent: CartComponent){
        
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

}

