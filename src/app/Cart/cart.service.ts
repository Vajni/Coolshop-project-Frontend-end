import { Injectable } from '@angular/core';
import { IProduct} from '../Products/product';

@Injectable()
export class CartService {
    orderedProducts: Array<IProduct> = new Array; 
    totalPrice: number = 0;
    
    get Products() : Array<IProduct>{
        return this.orderedProducts;
    }

}