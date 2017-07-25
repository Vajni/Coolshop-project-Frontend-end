import { Component } from '@angular/core';

@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent {

    username: string;
    email: string;
    password: string;
    passwordagain: string;
    phonenumber: string;

    country: string;
    region: string;
    postalcode: string;
    city: string;
    streetandstreetnumber: string;

    registration(username, email, password, passwordagain, phonenumber, country, region, postalcode, city, streetandstreetnumber) {
        if (username==null || email==null || password==null || passwordagain==null || phonenumber==null || country==null || region==null || postalcode==null || city==null || streetandstreetnumber==null) {
        alert("You must fill out all field.");
        } else if (password != passwordagain) {
            alert("Passwords are not the same.")
        } else {
            alert("Everything is ok.")
            console.log(username);
        }
    }


}