import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import {SharedData } from './../shared-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AdvanceService } from '../advance-search/advance.service';
import { FormControl, NgForm, Validators } from '@angular/forms'
import {DatePipe} from '@angular/common';
import { AllCategoryService } from '../all/all-category/all-category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
  providers: [AllCategoryService]
})
export class UserSidebarComponent implements OnInit,OnDestroy {
  cat: any = [];
  state: any = [];
  agency: any=[];
  subcates;
  subcatsearch;
  
    statsearch;
    catsearch;
    agensearch;

  enterdate;
  duedate;
  agencies;
  states;
  cates;
  loaded;
  status;sub_categories:any[];
  foods = [
  { value: 'active', viewValue: 'Active' },
  { value: 'expire', viewValue: 'Expire' },
  { value: 'all', viewValue: 'All' }
  ];
  local;
  uname;
  endRequest;
    constructor(private datePipe: DatePipe,public _shareData: SharedData,private _nav: Router, private _serv: SidebarService, private _adserv: AdvanceService,private _serv1:AllCategoryService) {
      this._serv1.rfpcategory_subsat().subscribe(
        data => {
          this.cat = data;
          console.log(this.cat)
          this.loaded = true;
        },
        error => {
        }
      )
    }

    formclear() {
      this.status = undefined;
      this.enterdate = undefined;
      this.duedate = undefined;
      this.states = undefined;
      this.agencies=undefined;
      this.cates = undefined;
      delete this.enterdate;
      delete this.duedate;
  this.subcates=undefined;
    }
    onSubmit(F: NgForm) {
     
      console.log(F)
        // if (F.valid == true) {
          if(this.status){
            localStorage.setItem('status',this.status)
          }
          if(this.enterdate){localStorage.setItem('enterdate',this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "))}
           if(this.duedate) {  localStorage.setItem('duedate',this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "))}
          if(this.states){ localStorage.setItem('states',this.states)}
          if(this.agencies){localStorage.setItem('agencies',this.agencies)}
          if(this.cates){localStorage.setItem('cates',this.cates)}
          if(this.subcates){localStorage.setItem('subcat',this.subcates)}
            let searchUrl = 'find-rfp';
          
            this._nav.navigate([searchUrl],
            
               {
                queryParams: {
                    status: this.status,
                    enterdate: this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "),
                    duedate: this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "),
                    state: this.states,
                    agency: this.agencies,
                    cat: this.cates,
                    subcat:this.subcates
                }
            });
        // }
    }
    
  catRfp(item) {
  
    this._shareData.categoryInfo(item);
    this.formclear();         
    let sth = 'category';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }
  
  rfpState(state) {
    console.log("sssssssssssssss", state);
    this._shareData.stateInfo(state); 
    this.formclear();         
            
    let sth = 'state';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  subcategory(value){
    this._adserv.rfpsinglesubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
        console.log(this.sub_categories);
      }
    )
  }
  ngOnInit() {
    if(localStorage.getItem('status')!="undefined"){this.status=localStorage.getItem('status')}
    if(localStorage.getItem('enterdate')!="undefined"){this.enterdate=localStorage.getItem('enterdate')}
     if(localStorage.getItem('duedate')!="undefined"){this.duedate=localStorage.getItem('duedate')}
     if(localStorage.getItem('states')!="undefined"){  this.states= localStorage.getItem('states');
    }
   if( localStorage.getItem('agencies')!="undefined"){this.agencies= localStorage.getItem('agencies')}
    if(localStorage.getItem('cates')!="undefined"){ this.cates=localStorage.getItem('cates')}
    if(localStorage.getItem('subcat')!="undefined"){ this.subcates=localStorage.getItem('subcat')}
this.endRequest= this._adserv.rfpstate().subscribe(
  data => {
  this.state = data.Result;
  console.log(this.state);
  },
  error => {
  // console.log(error);
  });
  this.endRequest=this._adserv.rfpcategory().subscribe(
  data => {
  this.cat = data;
  // console.log(data);
  },
  error => {
  // console.log(error);
  }
  )
      this.endRequest=this._adserv.rfpagencys().subscribe(
          data=>{
              this.agency=data.Result;
              console.log(this.agency);
          }
      )


  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return true
    }
    else {
      return false
    }

  }
  ngOnDestroy(){
    this.endRequest.unsubscribe();
localStorage.removeItem('status')
 localStorage.removeItem('enterdate')
localStorage.removeItem('duedate')
 localStorage.removeItem('states');
 localStorage.removeItem('subcat')

localStorage.removeItem('agencies')
localStorage.removeItem('cates')
delete this.status;
delete this.enterdate;
delete this.duedate;
delete this.states;
delete this.agencies;
delete this.cates;
delete this.subcates;

  }
}
