import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {PageEvent} from '@angular/material';
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from './../shared-service';
import {ResultsService} from './results.service';
import {PagerService} from '../rfps/rfp/paginator.service';
import * as moment from 'moment';
import { Meta, Title } from '@angular/platform-browser';

declare const $: any;
import {Location} from '@angular/common';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [PagerService]
})

export class ResultsComponent implements OnInit,OnDestroy {
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
    sorted;
    constructor(private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: ResultsService ,private route: ActivatedRoute,private _location: Location,private Title: Title, private meta: Meta) {localStorage.removeItem('member'); }
    // MatPaginator Inputs
    endRequest;
    length = 0;
    pager: any = {};  

    pageSize = '10';
    pageSizeOptions = [10, 20, 35, 50];

    // MatPaginator Output
    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        // console.log(this.pageSizeOptions);
    }



    download(info){
        console.log(info);
       this.endRequest= this._serv.downloadFile(info).subscribe(
            data =>{
                if(data.status ="200"){
                    swal(
                        'File Downloaded Successfully!',
                        '',
                        'success'
                    )
                    //  console.log("dsdasd");
                }
            } ,
            error=>{

            });
    }
    // order="asc"
    sort(sorted,page){
        this.route.queryParams
        .subscribe(params => {
            this.cat = params.keyword
        console.log(sorted)
        this._serv.sortby(sorted,this.cat,page,this.pageSize).subscribe(
            data => {
                this.record = data.results;
                console.log(data.results)
                this.item = data.totalItems
                this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
            })
        })
    }
    ngOnInit() {
        this.Title.setTitle( 'Search |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        this.onPaginateChange(1);
       
        this.check_login()
    }
    page(pageSize){
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
      move(){
        this.route.queryParams
        .subscribe(params => {
            this.cat = params.keyword
        localStorage.setItem('location','searched-data'+this.cat)
        })
      }
      memberonly(){
        this.route.queryParams
        .subscribe(params => {
            this.cat = params.keyword
        if(!this.local){
            this._nav.navigate(['login']);
            localStorage.setItem('member','searched-data'+this.cat );

        }
        else if(!this.subscribe){
            this._nav.navigate(['pricing']);
            localStorage.setItem('member','searched-data'+this.cat );

        
        }
    })}
    onPaginateChange(page:number) {
        // this.route.params
        // .subscribe(params => {
          
        // //   console.log(params); // {order: "popular"}
  
        //   this.cat = params['query'];
        //   console.log(this.cat)
        // this._shareData.returnCategory().subscribe(
        //     data => {
        //         this.cat = data;
       
            this.route.queryParams
                .subscribe(params => {
                    this.cat = params.keyword
                    
                this._serv.searchrfprecord(this.cat, this.pageSize,page).subscribe(
                    data => {
                        this.record = data.results;
                        this.item = data.totalItems
                        this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
                        // alert(this.item)
//                        this._serv.toalsearchrecord(this.cat).subscribe(
//                             data => {
//                                 this.item = data.totalItems
//                                 this.length = this.item;
// 
//                             })

                    },
                    error => {
                        console.log(error);
                    })
            })
        // const startIndex = event.pageIndex * event.pageSize;
    //    this.endRequest= this._serv.searchrfprecord(this.cat, this.pageSize, page).subscribe(
    //         data => {
    //             this.record = data.results;
    //         this.pager = this.pagerService.getPager(data['totalItems'], page);
    //         },
    //         error => {
    //             // console.log(error);
    //         });
        // })
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
           this.endRequest= this._serv.usersubscribe(this.uname).subscribe(
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
    }
    ngOnDestroy(){
        // this.endRequest.unsubscribe();
    }
}
