import {Component, OnInit, Input} from '@angular/core';

import {Product} from '../MerchantPage/product';
import {MerchantSelectorService} from './ms.service';

@Component({
    selector: '[app-merchantselector]',
    templateUrl: './ms.component.html',
    styleUrls: ['./ms.component.css']
})

export class MerchantSelectorComponent {

    @Input()
    private product: Product;

    constructor(private _merchantSelectorService: MerchantSelectorService) {
    }
}