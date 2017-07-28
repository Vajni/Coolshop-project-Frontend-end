import { Component } from '@angular/core';
import { User } from './user';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css'],
    providers: [RegistrationService]

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

    user: User = new User(0, this.username, this.email, this.password, this.passwordagain, this.phonenumber, this.country, this.region, this.postalcode, this.city, this.streetandstreetnumber);

    constructor(private registrationService: RegistrationService, private router: Router) {}

        registration(username, email, password, passwordagain, phonenumber, country, region, postalcode, city, streetandstreetnumber): User {
        if (username==null || email==null || password==null || passwordagain==null || phonenumber==null || country==null || region==null || postalcode==null || city==null || streetandstreetnumber==null) {
        alert("You must fill out all field.");
        } else if (password != passwordagain) {
            alert("Passwords are not the same.")
        } else if (email.search("@") == -1){
            alert("Invalid e-mail.")
        } else {
            let user1 = new User(0, username, email, password, passwordagain, phonenumber, country, region, postalcode, city, streetandstreetnumber);
            let user = JSON.stringify(user1);
            alert(user1.userName)
            return user1;
        }

    }


    onPost() {
        this.registrationService.valamilyenneven(this.registration(this.username, this.email, this.password, this.passwordagain, this.phonenumber, this.country, this.region, this.postalcode, this.city, this.streetandstreetnumber)).subscribe((response) => {
            if (response._body === "This e-mail address already in use.") {
                alert("This e-mail address already in use.")
            } else if (response._body === "Something went wrong.") {
                alert("Something went wrong.")
            } else {
                alert("ok");
                this.router.navigate(["login"]);
            }
        });
    }

}
