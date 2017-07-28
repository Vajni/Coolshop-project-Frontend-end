import { Input} from '@angular/core';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';
import {User} from '../RoleManagement/user';

@Injectable()
export class RoleSelectorService {

    constructor(private http: Http) {
    }

    @Input()
    private user: User;
    private _updateRoleUrl;

    test(userId: number, userRole: String) {
        console.log( 'UserID:' + userId, ' User-Role: ' + userRole);
    }

    updateUserRole(id: number, role: String): Observable<any> {
        this._updateRoleUrl = 'http://localhost:8080/CoolShop-1.0/rest/RoleManagement/updateRole/' + id + '';
        return this.http.post(this._updateRoleUrl, role);
    }
}