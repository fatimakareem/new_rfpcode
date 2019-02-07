import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CategoryRfpService } from './category-rfp.service';
import {PageEvent} from '@angular/material';
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from '../../shared-service';
declare const $: any;
import {PagerService} from '../rfp/paginator.service';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../../edit-rfp/edit-rfp.component';

@Component({
  selector: 'app-category-rfp',
  templateUrl: './category-rfp.component.html',
  styleUrls: ['./category-rfp.component.css'],
  providers: [PagerService,SharedData,CategoryRfpService]
})
export class CategoryRfpComponent implements OnInit {
  date;
  back(){
    this._location.back();
  }
  check(date){
       
    this.date= moment(date, this.formats, true).isValid()
  //    
    return this.date;
   
 
}
formats = [
  moment.ISO_8601,
  "YYYY/MM/DD"
];
  item;
  cat;
  record:any = [] ;
    status;
  local;
  uname;
  subscribe;
  
  constructor(public dialog: MatDialog,private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: CategoryRfpService ,private route: ActivatedRoute,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {localStorage.removeItem('member');
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
  // MatPaginator Inputs
  length = 0;
  pageSize = '50';
  pageSizeOptions = [10, 20, 35, 50];
  pager: any = {};  

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  move(){
    this.route.queryParams
    .subscribe(params => {
        this.cat = params.cat
    localStorage.setItem('location','category'+this.cat)
    })
  }
  memberonly(){
    this.route.queryParams
    .subscribe(params => {
        this.cat = params.cat
    if(!this.local){
        this._nav.navigate(['login']);
        localStorage.setItem('member','category'+this.cat)

    }
    else if(!this.subscribe){
        this._nav.navigate(['pricing']);
        localStorage.setItem('member','category'+this.cat)

    
    }})
  }

  download(info){
    console.log(info);
    this._serv.downloadFile(info).subscribe(
        data =>{
             if(data.status ="200"){
                swal(
                    'File Downloaded Successfully!',
                    '',
                    'success'
                  )
             }
        } ,
        error=>{
    
        });
            }
            adminlogin;
  ngOnInit() {
    this.setpage(1);
    this.check_login();
    if(localStorage.getItem('currentadmin')){
      this.adminlogin=localStorage.getItem('currentadmin')
    }
 
  }
setpage(page:number){
  // this._shareData.returnCategory().subscribe(
  //   data => {
  //     this.cat = data;
  //       if(!data) {
            this.route.queryParams
                .subscribe(params => {
                    this.cat = params.cat
                    this.meta.updateTag({ name:'twitter:title', content: params.cat +' | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
                    this.meta.updateTag({ property:'og:title', content: params.cat +' | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });

                    this.Title.setTitle(  params.cat +' | RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        //         })
        // }
  this._serv.catrfprecord(this.cat, this.pageSize,page).subscribe(
      data => {
          this.record = data.Results;
         this.item = data.totalItems
         this.length = this.item;
         this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
      },
      error => {
          console.log(error);
      });
})
}
  onPaginateChange(event) {
    const startIndex = event.pageIndex * event.pageSize;    
    this._serv.catrfprecord(this.cat, event.pageSize, event.pageIndex+1).subscribe(
      data => {
          this.record = data.Results;
         this.item = data.totalItems
         this.length = this.item;
      },
      error => {
          // console.log(error);
      });
  }
  single(query){
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
     let pars = JSON.parse(this.local) ;
     this.uname = pars.username
    this._serv.usersubscribe(this.uname).subscribe(
        data =>{
          if(data.Response == "Subscribe user"){
             this.subscribe = data.Response
            return false
          }
        },
        error =>{
        // console.log(error);
        });
     
    }
    else {
      return true
    }
  } btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp) {

    const dialogRef = this.dialog.open(EditRfpComponent, {
      width:'60%',
      height:'600px',
      position:{top:'10%', left:'20%'},
      data: {
        rfpkey: rfpkey,
        rfp_number: rfp_number,
        title: title,
        descriptionTag: descriptionTag,
        state: state,
        agency: agency,
        date_entered: date_entered,
        due_date: due_date,
        web_infoo: web_info,
        rfp_reference: rfp_reference,
        id: id,
        category: category,
        subcat: sub_category,
        seoTitleUrl: seoTitleUrl,
        bid_type: bid_type,
        agency_type: agency_type,
        city_or_county: city_or_county,
        city: city,
        open_rfp: openrfp
        // CourseDetail: this.Courses
      }
    });

  }
}
