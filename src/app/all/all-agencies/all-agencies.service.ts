import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class AllAgenciesService {
    constructor(private _http: HttpService, private _http5: Http) { }
    loaded: boolean = false;
    rfpagency() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/allagency/',
            { headers: headers }).map((response: Response) => response.json());
    }
    searchrecord(obj) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('http://192.168.30.132:7000/rf_p/agency/' + obj + '/'+'20',
            { headers: headers }).map((response: Response) => response.json());
    }
}