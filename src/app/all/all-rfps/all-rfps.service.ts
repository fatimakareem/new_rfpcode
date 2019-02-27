import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class AllRfpsService {
    currentUser;
    constructor(private _http: HttpService, private _http5: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    latestrfpecord(items, page) {
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    latestrfps(items, page) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    downloadFile(id) {
        let headers = new Headers();
        if (this.currentUser) {
            headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/',
            { headers: headers }).map((response: Response) => response.json());
    }
    unsub_staterecord(state, items, page) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/unsub_std/' + state + '/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    usersubscribe(username) {
        return this._http5.post('https://apis.rfpgurus.com/pkg_sub/', {
            'username': username
        }).map((res: Response) => res.json())
    }
    update_rfp(data) {
        alert(data.data_model)
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        if (data.data_model == false) {
            return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_old_table/' + data.id, JSON.stringify({
                "rfpkey": data.rfpkey,
                "rfp_number": data.rfp_number,
                "title": data.title,
                "record_added": data.record_added,
                "descriptionTag": data.descriptionTag,
                "state": data.states,
                "agency": data.agency,
                "date_entered": data.date_entered,
                "due_date": data.due_date,
                "web_info": data.web_info,
                "rfp_reference": null,
                "new_category": data.category,
                "sub_category": data.subcat,
                "seoTitleUrl": data.seoTitleUrl,
                "bid_type": data.bid_type,
                "agency_type": data.agency_type,
                "city_or_county": data.city_or_county,
                "city": data.city,
                "open_rfp": data.open_rfp
            }),
                { headers: headers }).map((response: Response) => response.json());
        } else {
               return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_cleaning_table/' + data.id, JSON.stringify({
                    "rfpkey": data.rfpkey,
                    "rfp_number": data.rfp_number,
                    "title": data.title,
    
                    "descriptionTag": data.descriptionTag,
                    "state": data.state,
                    "agency": data.agency,
                    "date_entered": data.date_entered,
                    "due_date": data.due_date,
                    "web_info": data.web_info,
                    "rfp_reference": null,
                    "new_category": data.category,
                    "sub_category": data.subcat,
                    "seoTitleUrl": data.seoTitleUrl,
                    "bid_type": data.bid_type,
                    "agency_type": data.agency_type,
                    "city_or_county": data.city_or_county,
                    "city": data.city,
                    "open_rfp": data.open_rfp
                }),
                    { headers: headers }).map((response: Response) => response.json());
        }

    }
    add_rfp(data) {

        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://apis.rfpgurus.com/rf_p/add_rfp/', JSON.stringify({

            "rfpkey": data.rfpkey,
            "rfp_number": data.rfp_number,
            "title": data.title,
            "descriptionTag": data.descriptionTag,
            "state": data.states,
            "agency": data.agency,
            "date_entered": data.date_entered,
            "due_date": data.due_date,
            "web_info": data.web_info,
            "rfp_reference": data.rfp_reference,
            "new_category": data.category,
            "sub_category": data.subcat,
            "seoTitleUrl": data.seoTitleUrl,
            "bid_type": data.bid_type,
            "agency_type": data.agency_type,
            "city_or_county": data.city_or_county,
            "city": data.city,
            "open_rfp": data.open_rfp,
            "record_added": data.record_added,
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
}