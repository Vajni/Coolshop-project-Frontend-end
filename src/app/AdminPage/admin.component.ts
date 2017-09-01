import { Component } from "@angular/core";
import { User } from "../RoleManagement/user";
import { AdminService } from "./admin.service";
import { Router } from "@angular/router";

@Component({
    selector: 'pm-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    
  })
export class Admin{

    email : string;
    password : string;

    constructor(private _adminService : AdminService, private _router : Router){}

    sendClicked() {
        this._adminService.checkLogin(this.email, this.password).subscribe(success => {
          if (success) {
            this._router.navigate(["rolemanagement"]);
          }
          else {
            alert("Either your email or password was incorrect or you are not an administrator.");
          }
        })
      }
}