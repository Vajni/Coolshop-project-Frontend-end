import {Component, OnInit,} from '@angular/core';
import {NgClass} from '@angular/common';

import {MerchantPageService} from "./mp.service";
import {Product} from "./product";

//jQuery and $ should be decleared to use jquery syntax without problems!
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'mp',
    templateUrl: 'mp.component.html',
    styleUrls: ['mp.component.css']
})

export class MerchantPageComponent {

    products: Product[];
    errorMessage: string;
    test: string;

    constructor(private _merchantPageService: MerchantPageService) {
    }

    ngOnInit(): void{
        this._merchantPageService.getProducts()
        .subscribe(products =>{
            this.products = products;
            }, error => this.errorMessage = <any>error);
    }
}
