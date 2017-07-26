import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { RoleManagementService } from './rolemanagement.service';

@Component({
    selector: 'rolemanagement',
    templateUrl: './rolemanagement.component.html',
    styleUrls: ['./rolemanagement.component.css']
})

export class RoleManagementComponent {
    users: User[];
    errorMessage: string;

    constructor(private _roleManagementService: RoleManagementService){}

    ngOnInit(): void {
        this._roleManagementService.getUserRoles()
            .subscribe(users => this.users = users, error => this.errorMessage = <any>error);
    }
}