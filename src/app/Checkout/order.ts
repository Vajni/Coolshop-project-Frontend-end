export class Order{

    orderId: number;
    userId: number;
    productID: number;
    unitsOnOrder: number;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    shipName:string;
    shipAddress:string;
    shipCity:string;
    shipRegion:string;
    shipPostalCode:string;
    shipCountry:string;

   constructor(orderId: number, userId: number, productID: number, unitsOnOrder: number, orderDate: Date, requiredDate: Date, shippedDate: Date, shipName:string, shipAddress:string, shipCity:string, shipRegion:string, shipPostalCode:string, shipCountry:string,){
        this.orderId = orderId;
        this.userId = userId;
        this.productID = productID;
        this.unitsOnOrder = unitsOnOrder;
        this.orderDate = orderDate;
        this.requiredDate = requiredDate;
        this.shippedDate = shippedDate;
        this.shipName = shipName;
        this.shipAddress = shipAddress;
        this.shipCity = shipCity;
        this.shipRegion = shipRegion;
        this.shipPostalCode = shipPostalCode;
        this.shipCountry = shipCountry;
    } 

}