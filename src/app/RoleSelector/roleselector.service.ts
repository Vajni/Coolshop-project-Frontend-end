import { Input} from '@angular/core';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';
import {User} from '../RoleManagement/user';
import { HTTPWrapper } from "../HTTPWrapper/wrapper.service";

@Injectable()
export class RoleSelectorService {

    constructor(private httpWrapper: HTTPWrapper) {
    }

    @Input()
    private user: User;
    private _updateRoleUrl;

    test(userId: number, userRole: String) {
        console.log( 'UserID:' + userId, ' User-Role: ' + userRole);
    }

    updateUserRole(id: number, role: String): Observable<any> {
        this._updateRoleUrl = 'http://localhost:8080/CoolShop-1.0/rest/RoleManagement/updateRole/' + id + '';
        return this.httpWrapper.post(role, this._updateRoleUrl);
    }
}