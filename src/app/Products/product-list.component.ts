import {Component, OnInit, HostBinding} from "@angular/core";
import {IProduct} from "./product";
import {ProductService } from "./product.service";
import {CartComponent} from '../Cart/cart.component';

@Component({
  selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
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
  errorMessage: string;

  constructor(private _productService: ProductService, private cartComponent: CartComponent){
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

}