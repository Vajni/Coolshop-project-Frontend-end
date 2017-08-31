import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { User } from '../Registration/user';
import { Order } from './order';
import { Router } from '@angular/router';
import { CartService } from "../Cart/cart.service";
import { CartComponent } from "../Cart/cart.component";
import { LoginService } from '../Login/login.service';
import { IProduct} from '../Products/product';
import { StorageService } from '../Storage/storage.service';
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

declare var paypal: any;

@Component({
    selector: 'checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.css'],
    providers: [CheckoutService]

})
export class CheckoutComponent implements OnInit{


    errorMessage: string;
    user: User;
    checked: boolean = false;
    deliverycountry: string;
    deliverycity: string;
    deliveryregion: string;
    deliveryaddress: string;
    deliverypostalcode: string;
    today: Date = new Date();
    requiredDate: Date = new Date("February 10, 2017 10:10:00");
    shippedDate: Date = new Date("February 8, 2017 20:10:00");
    addressOrder: Order;
    deliveryOrder: Order;
    orderedProducts: Array<IProduct> = this.cartService.orderedProducts;



    constructor(private _httpWrapper : HTTPWrapper, private checkoutService: CheckoutService, private router: Router, private cartComponent: CartComponent, private loginService: LoginService, private cartService: CartService, private storageService: StorageService) {}

    


    ngOnInit(): void {
        console.log(<string>this.storageService.read("token"))
        this.checkoutService.getAddress(<string>this.storageService.read("token")).subscribe(user => this.user = user, error => this.errorMessage = <any>error);

    }
    

    orderAddToDatabase(): void{
        if (this.checked == false) {
            this.orderWithHomeAddress();
        } else {
            this.orderWithDeliveryAddress();
    }

    }

    onBack(): void{
        this.router.navigate(['/products']);
    }

    orderWithHomeAddress(): void {
        for (let product of CheckoutService.checkoutProducts) {
                this.addressOrder = new Order(0, this.user.userID, product.productID, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.user.address, this.user.city, this.user.region, this.user.postalCode, this.user.country);
                this.checkoutService.postOrder(this.addressOrder).subscribe();
            }
            this.router.navigate(["payment"])
    }

    orderWithDeliveryAddress(): void {
        if (this.deliverycountry==null || this.deliverycity==null || this.deliveryregion==null || this.deliveryaddress==null || this.deliverypostalcode==null ){
                alert("You must fill out all field.");
            } else {
                for (let product of CheckoutService.checkoutProducts) {
            this.deliveryOrder = new Order(0, this.user.userID, product.productID, this.today, this.requiredDate, this.shippedDate, this.user.userName, this.deliveryaddress, this.deliverycity, this.deliveryregion, this.deliverypostalcode, this.deliverycountry);
            this.checkoutService.postOrder(this.deliveryOrder).subscribe();
                }
            this.router.navigate(["payment"])
        }
    }
}