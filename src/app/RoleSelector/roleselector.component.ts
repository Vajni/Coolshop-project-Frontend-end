import { Component, OnInit, Input } from '@angular/core';

import { User } from '../RoleManagement/user';
import { RoleSelectorService} from './roleselector.service';

@Component({
  selector: '[app-roleselector]',
  templateUrl: './roleselector.component.html',
  styleUrls: ['./roleselector.component.css']
})

export class RoleSelectorComponent implements OnInit {

  private roles: string[] = ['user', 'merchant', 'admin'];

  @Input()
  private user: User;

  constructor(private _roleSelectorService: RoleSelectorService) { }

  ngOnInit() {
    console.log('Role for this user has been changed', this.user);
  }

  random() {
    this._roleSelectorService.test(this.user.userID, this.user.role);
  }

  onChange() {
    this._roleSelectorService.updateUserRole(this.user.userID, this.user.role)
      .subscribe();
  }
}