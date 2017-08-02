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

  //test függvény
  getName(productName: String) {
    this._productService.logName(productName);
  }

  countTotalPrice(productPrice: number): number {
    this.totalPrice += productPrice;
    return this.totalPrice;
  }

  orderProduct(product: IProduct) {
    this.orderedProducts.push(product);
    for(let product of this.orderedProducts) {
      console.log(product.productName);
    }
    return this.orderedProducts;
  }
}
