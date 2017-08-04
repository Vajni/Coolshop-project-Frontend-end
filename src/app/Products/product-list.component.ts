import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import { ProductService } from "./product.service";

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
  //ferijé he!
  orderedProducts: Array<IProduct> = new Array;
  totalPrice: number = 0;

  constructor(private _productService: ProductService){
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

  //test függvény INNENTŐL A FERIJÉ HE
  getName(productName: String) {
    this._productService.logName(productName);
  }

  orderProduct(product: IProduct) {
    product.productQuantity = 1;
    this.orderedProducts.push(product);
    return this.orderedProducts;
  }

  addToTotalPrice(productPrice: number): number {
    this.totalPrice += productPrice;
    return this.totalPrice;
  }

  subtractFromTotalPrice(productPrice: number): number {
    this.totalPrice -= productPrice;
    return this.totalPrice;
  }

  increaseQuantity(product: IProduct) {
    product.productQuantity++;
  }

  decreaseQuantity(product: IProduct) {
    product.productQuantity--;
  }

  checkQuantity(product: IProduct, quantity: number) {
    let id: number = this.orderedProducts.indexOf(product);
    if(quantity == 0) {
      this.removeProduct(id);
    }
  }

  removeProduct(id: number) {
    this.orderedProducts.splice(id, 1);
    console.log(id);
  }
}