import {Component} from "@angular/core";
import {IProduct} from "../Products/product";
import {CartService} from './cart.service';
import { Router } from "@angular/router";
import { CheckoutService } from '../Checkout/checkout.service';
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

@Component({
  selector: 'pm-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
  
})


export class CartComponent {

    quantity : string;

    constructor(private _httpWrapper : HTTPWrapper, private cartService: CartService, private _router : Router, private checkoutService: CheckoutService) {
    }

    checkIfAdded(product: IProduct) {
        console.log(product.productID);
        if (this.findById(product.productID) != null) {
            this.increaseQuantity(this.findById(product.productID));
        } else {
            this.orderProduct(product);
        }
    }

    findById(id:number) : IProduct{
        let products : IProduct[] = this.cartService.Products;
            for (var i=0; i < products.length; i++){
                if (products[i].productID === id){
                    return products[i];
                }
            }
        return null;
    }

    orderProduct(product: IProduct) {
        product.unitsOnOrder = 1;
        product.productQuantity--;
        this.cartService.orderedProducts.push(product);
    }

    addToTotalPrice(productPrice: number) {
        this.cartService.totalPrice += productPrice;
    }

    subtractFromTotalPrice(productPrice: number) {
        this.cartService.totalPrice -= productPrice;
    }

    increaseQuantity(product: IProduct) {
        product.unitsOnOrder++;
        product.productQuantity--;      
    }

    decreaseQuantity(product: IProduct) {
        product.unitsOnOrder--;
        product.productQuantity++;
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

    checkTheCart(): void{
        if(this.cartService.orderedProducts.length == 0){
            alert("Your cart is empty");
        } else {
            this._router.navigate(['/checkout']);
        }
    }
}