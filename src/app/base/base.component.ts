import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { PagerService } from '../rfps/rfp/paginator.service';
import * as moment from 'moment';
import { AdvanceService } from '../advance-search/advance.service';
import { ActivatedRoute } from '@angular/router';
import {HttpService} from '../serv/http-service';
import { Meta, Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [PagerService, AdvanceService]
})
export class BaseComponent implements OnInit {
  data;
  state;
  pager: any = {};
  date;
  check(date){
       
    this.date= moment(date, this.formats, true).isValid()
     
    return this.date;
   
 
}
move(){
  localStorage.setItem('location','find-rfp')
}
formats = [
  moment.ISO_8601,
  "YYYY/MM/DD"
];
  onUserRowSelect(event): void {
    this.data = event.data.seoTitleUrl;
    console.log(this.data);
    let sth = 'rfp/' + this.data;
    this._nav.navigate([sth]);
    
  }
 
  items;
  public cat = [];
  pageSize = '15';
  settings: any;
  duedate;
  enterdate;
  states;
  cates;
  title;
  Rfpnum;
  status;
  agencies;
  item;
  length;
  search = false;
  constructor(private route: ActivatedRoute, private _adserv: AdvanceService, private pagerService: PagerService, private http: HttpService, private _nav: Router,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {
       
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
  }
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Find RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Find RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Find RFPs |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    // this.setpage(1);
    this.onPaginateChange(1);
    this._adserv.rfpcategory().subscribe(
      data => {
        this.cat = data
      })
    this._adserv.rfpstate().subscribe(
      data => {
        this.state = data.Result
      })
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  page(pageSize) {
    if (pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.onPaginateChange(1);
    }
    else {
      console.log()
      delete this.pageSize;
      console.log(this.pageSize)
    }
  }

  onPaginateChange(page: number) {
    
    this.route.queryParams
      .subscribe(params => {
        if(this.Rfpnum || this.title || this.states || this.cates || this.duedate || this.enterdate){
          this._adserv.searchrfprecord(this.Rfpnum, this.title, this.status, this.enterdate, this.duedate, this.states, this.agencies, this.cates, this.pageSize, page).subscribe(
    
            data => {
              this.items = data.Results
              this.item = data.TotalResult;
              this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
              this.search = false;
            },
            error => {
              this.search = true;
              if (error.status == "400") {
                this.length = 0;
              }
            });
        }
       else if (params.status || params.enterdate || params.duedate || params.state || params.agency || params.cat) {
       
        this._adserv.searchrfprecord(this.Rfpnum, this.title, params.status, params.enterdate, params.duedate, params.state, params.agency, params.cat, this.pageSize, page).subscribe(
          data => {
            this.items = data.Results;
            this.item = data.TotalResult;
            this.length = this.item;
            this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
            this.search = false;
            
          },
          error => {
            this.search = true;

            if (error.status == "400") {
              this.items.splice(0, this.items.length);
              this.length = 0;
              this.status = undefined;
              this.enterdate = undefined;
              this.duedate = undefined;
              this.states = undefined;
              this.agencies = undefined;
              this.cates = undefined;
            }
          });
      }
        else {
      
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.get('https://apis.rfpgurus.com/rf_p/findrfp/' + this.pageSize + '?page=' + page, { headers: headers })
            .subscribe(Res => {
              this.items = Res.json()['results'];
              console.log(this.items, Res.json()['totalItems'], 'eee')
              this.pager = this.pagerService.getPager(Res.json()['totalItems'], page,this.pageSize);
              this.search = false;
             
            });
        }
      });
    
  }
}
