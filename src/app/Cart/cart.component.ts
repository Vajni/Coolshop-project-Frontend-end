import {Component} from "@angular/core";
import {IProduct} from "../Products/product";
import {CartService} from './cart.service';
import { Router } from "@angular/router";
import { CheckoutService } from '../Checkout/checkout.service';

@Component({
  selector: 'pm-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
  
})


export class CartComponent {

    constructor(private cartService: CartService, private _router : Router, private checkoutService: CheckoutService) {
    }

    checkIfAdded(product: IProduct) {
        console.log(this.cartService.Products);
        if (this.cartService.Products.includes(product)) {
            this.increaseQuantity(product);
        } else {
            this.orderProduct(product);
        }
    }

    orderProduct(product: IProduct) {
        product.productQuantity = 1;
        this.cartService.orderedProducts.push(product);
    }

    addToTotalPrice(productPrice: number) {
        this.cartService.totalPrice += productPrice;
    }

    subtractFromTotalPrice(productPrice: number) {
        this.cartService.totalPrice -= productPrice;
    }

    increaseQuantity(product: IProduct) {
        product.productQuantity++;
    }

    decreaseQuantity(product: IProduct) {
        product.productQuantity--;
    }

    checkQuantity(product: IProduct, quantity: number) {
        let id: number = this.cartService.orderedProducts.indexOf(product);
        if(quantity == 0) {
            this.removeProduct(id);
        }
    }

    removeProduct(id: number) {
        this.cartService.orderedProducts.splice(id, 1);
    }

    onOrder(): void{
        this.checkTheCart();
    }

    addProductsToCheckoutArray(): void{
        for (let product of this.cartService.orderedProducts) {
            let quan = product.productQuantity;
            for (var i = 1; i <= quan; i++) {
                CheckoutService.checkoutProducts.push(product);
            }
        }
    }

    checkTheCart(): void{
        if(this.cartService.orderedProducts.length == 0){
            alert("Your cart is empty");
        } else {
            this.addProductsToCheckoutArray();
            this._router.navigate(['/checkout']);
        }
    }
}