import {Component} from "@angular/core";
import {IProduct} from "../Products/product";
import {CartService} from './cart.service';

@Component({
  selector: 'pm-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})

export class CartComponent {

    constructor(private cartService: CartService) {
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
}