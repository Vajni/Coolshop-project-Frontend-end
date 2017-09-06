import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

@Injectable()
export class RegistrationService{
    

    constructor(private _httpWrapper: HTTPWrapper){

    }

    addToDatabase(user: User): Observable<any> {
        return this._httpWrapper.post(user, "http://localhost:8080/CoolShop-1.0/rest/register/addToDatabase");
    }
}

