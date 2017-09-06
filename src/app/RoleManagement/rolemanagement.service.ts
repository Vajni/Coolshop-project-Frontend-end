import {Injectable} from '@angular/core';
import {User} from './user';
import { Observable } from "rxjs/Observable";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

@Injectable()
export class RoleManagementService {
    private _getRoleUrl = 'http://localhost:8080/CoolShop-1.0/rest/RoleManagement/getRoles'
    private user: User;

    constructor(private _httpWrapper: HTTPWrapper) {
    }

    getUserRoles(): Observable<User[]> {
        
        return this._httpWrapper.get(this._getRoleUrl)
                    .map((response: Response) => <User[]>response.json())
                    .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }
}