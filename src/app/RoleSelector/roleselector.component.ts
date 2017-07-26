import { Component, OnInit, Input } from '@angular/core';

import { User } from '../RoleManagement/user';

@Component({
  selector: '[app-roleselector]',
  templateUrl: './roleselector.component.html',
  styleUrls: ['./roleselector.component.css']
})

export class RoleSelectorComponent implements OnInit {

  private roles: string[] = ['user', 'merchant', 'admin'];

  @Input()
  private user: User;

  constructor() { }

  ngOnInit() {
    console.log('Role for this user has been changed', this.user);
  }
}