import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService } from "./product.service";
import {CartComponent} from '../Cart/cart.component';

@Component({
  selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle: string = "Product List";
  imageWidth: number = 80;
  imageMargin: number = 2;
  showImage: boolean = true;
  listFilter: string;
  products: IProduct[];
  errorMessage: string;

  constructor(private _productService: ProductService, private _cartComponent: CartComponent){
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._productService.getProducts()
    .subscribe(products => this.products = products, error => this.errorMessage = <any>error);
  }

  onRatingClicked(message: string):void{
    this.pageTitle = "Product List " + message;
  }

  orderProduct(product: IProduct) {
    this._cartComponent.orderProduct(product);
  }

  addToTotalPrice(productPrice: number) {
    this._cartComponent.addToTotalPrice(productPrice);
  }
}