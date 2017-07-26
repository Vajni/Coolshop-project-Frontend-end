import {Injectable} from '@angular/core';
import {User} from './user';
import { Observable } from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

@Injectable()
export class RoleManagementService {
    private _productUrl = 'http://localhost:8080/CoolShop-1.0/rest/RoleManagement/getRoles'

    constructor(private _http: Http) {
    }

    getUserRoles(): Observable<User[]> {
        return this._http.get(this._productUrl)
                    .map((response: Response) => <User[]>response.json())
                    .do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}