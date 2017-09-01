import {Component, OnInit, HostBinding} from "@angular/core";
import {IProduct} from "./product";
import {ProductService } from "./product.service";
import {CartComponent} from '../Cart/cart.component';
import { CartService } from "../Cart/cart.service";

@Component({
  selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
})
export class ProductListComponent implements OnInit{
/*
**This is how you give css selector to a @Component selector ->
*/
@HostBinding('class') ProductListClass = 'pm-products';

  pageTitle: string = "Product List";
  imageWidth: number = 80;
  imageMargin: number = 2;
  showImage: boolean = true;
  listFilter: string;
  products: IProduct[];
  productsFromCart : IProduct[];
  errorMessage: string;

  constructor(private _productService: ProductService, private cartComponent: CartComponent, private _cartService : CartService){
    this.productsFromCart = _cartService.Products ;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._productService.getProducts()
    .subscribe(products => this.products = products, error => this.errorMessage = <any>error);
  }

  addToTotalPrice(productPrice: number) {
    this.cartComponent.addToTotalPrice(productPrice);
  }

  checkIfAdded(product: IProduct) {
    this.cartComponent.checkIfAdded(product);
  }

  checkIfInCart(product : IProduct) : boolean{
    this.productsFromCart.forEach(element => {
      if (element.productId === product.productId){
        console.log("True");
        return true;
        
      }
    });
    console.log("False");
    return false;
  }

}