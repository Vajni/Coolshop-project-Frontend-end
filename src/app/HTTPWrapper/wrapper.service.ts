import { Injectable } from "@angular/core";
import { StorageService } from "../Storage/storage.service";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class HTTPWrapper{

    constructor(private _storageService : StorageService, private http : Http){}

    generateAuthorizationHeader() : Headers{
        const token = <string>this._storageService.read("token");
        let headers = new Headers();
        headers.append("X-token", token);
        return headers;
    }

    get(url){
        let headers = this.generateAuthorizationHeader();
        let options = new RequestOptions({headers});
        return this.http.get(url, options);
    }

    post(url, data){
        let headers = this.generateAuthorizationHeader();
        return this.http.post(data, url, {headers});
    }
}