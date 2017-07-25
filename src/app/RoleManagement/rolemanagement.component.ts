import { Component } from '@angular/core';

import { User } from './user';

const USERS: User[] = [
    {name: 'TestUser', role: 'user'},
    {name: 'TestMerchant', role: 'merchat'},
    {name: 'TestAdmin', role: 'admin'}
];

@Component({
    selector: 'rolemanagement',
    templateUrl: './rolemanagement.component.html',
    styleUrls: ['./rolemanagement.component.css']
})

export class RoleManagementComponent {
    users = USERS;
}