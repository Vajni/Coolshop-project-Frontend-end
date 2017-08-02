export class User {
    userID: number;
    userName: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    country: string;
    region: string;
    postalCode: string;
    city: string;
    address: string;

    constructor(userID: number, userName: string, email: string, password: string, role: string, phone: string, country: string, region: string, postalCode: string, city: string, address: string) {
        this.userID = 0;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = "user";
        this.phone = phone;
        this.country = country;
        this.region = region;
        this.postalCode = postalCode;
        this.city = city;
        this.address = address;

    }

}
