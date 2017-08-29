import {Component, OnInit} from '@angular/core';

import {MerchantPageService} from "./mp.service";
import {Product} from "./product";

@Component({
    selector: 'mp',
    templateUrl: 'mp.component.html',
    styleUrls: ['mp.component.css']
})

export class MerchantPageComponent {

    products: Product[];
    errorMessage: string;

    constructor(private _merchantPageService: MerchantPageService) {
    }

    ngOnInit(): void{
        this._merchantPageService.getProducts()
        .subscribe(products => this.products = products, error => this.errorMessage = <any>error);
    }
}