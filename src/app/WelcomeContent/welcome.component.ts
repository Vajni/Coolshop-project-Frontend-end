
import { Component } from "@angular/core";
import { WelcomeService } from "./welcome.service";
import { IProduct } from "../Products/product";

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css']
    
})
export class WelcomeContent{
    
    errorMessage: any;
    products: IProduct[];

    constructor(private _welcomeService: WelcomeService){}

    ngOnInit(): void {
        this._welcomeService.getProducts()
        .subscribe(products => this.products = products, error => this.errorMessage = <any>error);
      }
}