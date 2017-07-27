import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class RegistrationService{
    

    constructor(private http: Http){

    }

    valamilyenneven(user: User): Observable<any> {
        return this.http.post("http://localhost:8080/CoolShop-1.0/rest/register/addToDatabase", user);
    }
}

