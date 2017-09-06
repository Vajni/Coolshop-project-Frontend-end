import { Component } from "@angular/core";
import { AdminService } from "./admin.service";
import { Router } from "@angular/router";
import { Log } from "./log";

@Component({
    selector: 'pm-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    
  })
export class Admin{

    logs : Log[];
    errorMessage : any;
    pageTitle : string = "Order Logs";

    constructor(private _adminService : AdminService, private _router : Router){}

    ngOnInit(){
      return this._adminService.getLogs().subscribe(logs => this.logs = logs, error => this.errorMessage = <any>error, ()=>console.log(this.logs));
    }
}