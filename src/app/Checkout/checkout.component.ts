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




    constructor(private _httpWrapper : HTTPWrapper, private checkoutService: CheckoutService, private router: Router, private cartComponent: CartComponent, private loginService: LoginService, private cartService: CartService, private storageService: StorageService) {}


    checked: boolean = false;
    deliverycountry: string;
    deliverycity: string;
    deliveryregion: string;
    deliveryaddress: string;
    deliverypostalcode: string;
    deliveryOrder: Order;
    today: Date = new Date();
    requiredDate: Date = new Date("February 10, 2017 10:10:00");
    shippedDate: Date = new Date("February 8, 2017 20:10:00");
    orderedProducts: Array<IProduct> = this.cartService.orderedProducts;


    ngOnInit(): void {
        console.log(<string>this.storageService.read("token"))
        this.checkoutService.getAddress(<string>this.storageService.read("token")).subscribe(user => this.checkoutService.user = user, error => this.checkoutService.errorMessage = <any>error);
    }


    setTheOrderInfo(): void{
            if (this.checked == false) {
            this.orderWithHomeAddress();
        } else if(this.checked == true ){
            this.orderWithDeliveryAddress();
        }
    }

    onBack(): void{
        this.router.navigate(['/products']);
    }

    orderWithHomeAddress(): void {
        CheckoutService.orderList = new Array();
        for (let product of this.cartService.orderedProducts) {
                this.checkoutService.addressOrder = new Order(0, this.checkoutService.user.userID, product.productID, product.unitsOnOrder, this.today, this.requiredDate, this.shippedDate, this.checkoutService.user.userName, this.checkoutService.user.address, this.checkoutService.user.city, this.checkoutService.user.region, this.checkoutService.user.postalCode, this.checkoutService.user.country);
                CheckoutService.orderList.push(this.checkoutService.addressOrder);
        }
        this.navigateToPaymentPage();
    }

    orderWithDeliveryAddress(): void {
        if (this.deliverycountry==null || this.deliverycity==null || this.deliveryregion==null || this.deliveryaddress==null || this.deliverypostalcode==null ){
            alert("You must fill out all field.");
        } else {
            CheckoutService.orderList = new Array();
            for (let product of this.cartService.orderedProducts) {
                this.checkoutService.addressOrder = new Order(0, this.checkoutService.user.userID, product.productID, product.unitsOnOrder, this.today, this.requiredDate, this.shippedDate, this.checkoutService.user.userName, this.deliveryaddress, this.deliverycity, this.deliveryregion, this.deliverypostalcode, this.deliverycountry);
                CheckoutService.orderList.push(this.checkoutService.addressOrder)
            }
            this.navigateToPaymentPage();
        }
    }

    navigateToPaymentPage(): void {
        if (this.cartService.orderedProducts.length == 0){
            alert("Your cart is empty. Go back and add your products to the cart again.")
        } else {
        this.router.navigate(["payment"])
        }
    }
}
