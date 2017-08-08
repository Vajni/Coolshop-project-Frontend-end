import {Component, OnInit} from "@angular/core";
import {IProduct} from "../Products/product";
import {CartService} from './cart.service';

@Component({
  selector: 'pm-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})

export class CartComponent {
    orderedProducts;
    totalPrice;

    constructor(private _cartService: CartService) {
        this.orderedProducts = _cartService.orderedProducts;
        this.totalPrice = _cartService.totalPrice;
    }

    orderProduct(product: IProduct) {
        this.orderedProducts.push(product);
        for(let product of this.orderedProducts) {
            console.log(product);
        }
    }
}