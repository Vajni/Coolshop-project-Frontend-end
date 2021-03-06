import { Component, OnInit, Input } from '@angular/core';

import { User } from '../RoleManagement/user';
import { RoleSelectorService} from './roleselector.service';

@Component({
  selector: '[app-roleselector]',
  templateUrl: './roleselector.component.html',
  styleUrls: ['./roleselector.component.css']
})

export class RoleSelectorComponent implements OnInit {

  private roles: string[] = ['admin', 'merchant', 'user'];

  @Input()
  private user: User;

  constructor(private _roleSelectorService: RoleSelectorService) { }

  ngOnInit() {
  }


  onChange() {
    this._roleSelectorService.updateUserRole(this.user.userID, this.user.role)
      .subscribe();
  }
}