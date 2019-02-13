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
    update_rfp(id,updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedweb_info,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedopen_rfp) {
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp/'+id,JSON.stringify({
            "rfpkey":uprfpkey,
"rfp_number":updatedrfp_number,
"title":updatedtitle,

"descriptionTag":updateddescriptionTag,
"state":updatedstates,
"agency":updatedagency,
"date_entered":updateddate_entered,
"due_date":updateddue_date,
"web_info":updatedweb_info,
"rfp_reference":updatedrfp_reference,
"category":updatedcategory,
"sub_category":updatedsubcat,
"seoTitleUrl":updatedseoTitleUrl,
"bid_type":updatedbid_type,
"agency_type":updatedagency_type,
"city_or_county":updatedcity_or_county,
"city":updatedcity,
"open_rfp":updatedopen_rfp
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
    add_rfp(id,updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedweb_info,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedopen_rfp) {
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp/'+id,JSON.stringify({
            // 'rfpkey','city_or_county', 'city','open_rfp', 'new_category', 'sub_category','rfp_number','title','bid_type','descriptionTag','state','agency','date_entered','due_date','web_info','rfp_reference','agency_type','seoTitleUrl'
            "rfpkey":uprfpkey,
"rfp_number":updatedrfp_number,
"title":updatedtitle,

"descriptionTag":updateddescriptionTag,
"state":updatedstates,
"agency":updatedagency,
"date_entered":updateddate_entered,
"due_date":updateddue_date,
"web_info":updatedweb_info,
"rfp_reference":updatedrfp_reference,
"new_category":updatedcategory,
"sub_category":updatedsubcat,
"seoTitleUrl":updatedseoTitleUrl,
"bid_type":updatedbid_type,
"agency_type":updatedagency_type,
"city_or_county":updatedcity_or_county,
"city":updatedcity,
"open_rfp":updatedopen_rfp
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
}