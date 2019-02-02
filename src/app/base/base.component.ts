import { Component, OnInit,OnDestroy } from '@angular/core';
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
export class BaseComponent implements OnInit,OnDestroy {
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
  ngOnInit() {
  this.route.queryParams
      .subscribe(params => {
        if(localStorage.getItem('status')!="undefined"){
          this.status=localStorage.getItem('status');}
        if(localStorage.getItem('enterdate')!="undefined"){this.enterdate=localStorage.getItem('enterdate')}
         if(localStorage.getItem('duedate')!="undefined"){this.duedate=localStorage.getItem('duedate')}
         if(localStorage.getItem('states')!="undefined"){ this.states= localStorage.getItem('states');
        }
       if( localStorage.getItem('agencies')!="undefined"){this.agencies= localStorage.getItem('agencies')}
        if(localStorage.getItem('cates')!="undefined"){ this.cates=localStorage.getItem('cates')}
        this.onPaginateChange(1);
      })
   
    this.meta.updateTag({ name:'twitter:title', content:'Find RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Find RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Find RFPs |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    // this.setpage(1);
   
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

changestate(states){
 
  this.states=states;
  localStorage.setItem('states',this.states)
  this.onPaginateChange(1);
  }
  changecates(cates){
    this.cates=cates;
    localStorage.setItem('cates',this.cates)
    this.onPaginateChange(1);
    }
    changeduedate(duedate){
      this.duedate=duedate;
      localStorage.setItem('duedate',this.duedate)
      this.onPaginateChange(1);
      }
      changeenterdate(enterdate){
        this.enterdate=enterdate;
        localStorage.setItem('enterdate',this.enterdate)
        this.onPaginateChange(1);
        }
        changeagencies(agencies){
          this.agencies=agencies;
          localStorage.setItem('agencies',this.agencies)
          this.onPaginateChange(1);
          }
  onPaginateChange(page: number) {
   if(this.states==null){
     delete this.states
   }if(this.cates==null){
    delete this.cates
  }
  if(this.duedate==null){
    delete this.duedate
  }
  if(this.enterdate==null){
    delete this.enterdate
  }
  if(this.agencies==null){
    delete this.agencies
  } if(this.status==null){
    delete this.status
  }
    // this.route.queryParams
    //   .subscribe(params => {
        if(this.Rfpnum || this.title || this.states!=null || this.cates!=null || this.duedate!=null || this.enterdate!=null || this.agencies || this.status){
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
      //  else if (params.status || params.enterdate || params.duedate || params.state || params.agency || params.cat) {
       
      //   this._adserv.searchrfprecord(this.Rfpnum, this.title, params.status, params.enterdate, params.duedate, params.state, params.agency, params.cat, this.pageSize, page).subscribe(
      //     data => {
      //       this.items = data.Results;
      //       this.item = data.TotalResult;
      //       this.length = this.item;
      //       this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
      //       this.search = false;
            
      //     },
      //     error => {
      //       this.search = true;

      //       if (error.status == "400") {
      //         this.items.splice(0, this.items.length);
      //         this.length = 0;
      //         this.status = undefined;
      //         this.enterdate = undefined;
      //         this.duedate = undefined;
      //         this.states = undefined;
      //         this.agencies = undefined;
      //         this.cates = undefined;
      //       }
      //     });
      // }
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
      // });
    
  }

  ngOnDestroy(){
   localStorage.removeItem('status')
localStorage.removeItem('enterdate')
  localStorage.removeItem('duedate')
     localStorage.removeItem('states');
    
localStorage.removeItem('agencies')
 localStorage.removeItem('cates')
 
  }
}
