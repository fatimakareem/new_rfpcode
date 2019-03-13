import { Component, OnInit, Inject , ElementRef, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service'; import { AdvanceService } from '../advance-search/advance.service';
import {  FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import { HttpService } from '../serv/http-service';
import swal from 'sweetalert2'
import { Headers, Http, Response } from '@angular/http';
import {SharedData} from '../shared-service';
import { from } from 'rxjs';
@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss'],
  providers: [PagerService, AllRfpsService, AdvanceService,SharedData]
})
export class EditRfpComponent implements OnInit { 

  model: any = [];
  agency: boolean = false;
  category: boolean = false;
  record_added: boolean = true;
  subcate: boolean = false;
  statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  sub_categories;
  date_entered = ''; due_date = ''; web_info; rfp_reference = '';
  constructor(private shared:SharedData, private http: HttpService,private _http: HttpService, private _serv1: AdvanceService, private _serv: AllRfpsService, public dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {alert(this.data.oldcategory)}
  acgeny_check() {
    this.agency = true;
  }
  cat_check() {
    this.category = true;
  }
  subchk() {
    this.subcate = true;
  }
  select_oldcat() {
    
    this._serv1.oldcategories(this.data.oldcategory).subscribe(
      data => {
       
        if (data.category) {
        this.data.category = data.category;
        this._serv1.rfpsubcat(this.data.category).subscribe(
          data => {
            this.sub_categories = data.sub_categories;
          }
        )
        }
      if(data.sub_category){
        this.data.subcat=data.sub_category;
      }

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}
  select_state() {
    
    this._serv1.admindropdown(this.data.state).subscribe(
      data => {
       
        if (data.Agencies) {
        this.agen = data.Agencies;

        }
      

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}
  ngOnInit() {
    this._serv1.rfpstate().subscribe(
      data => {
        this.Statess = data.Result;
      },
      error => {
        // console.log(error);
      }); this._serv1.rfpcategory().subscribe(
        data => {
          this.cat = data;
        },
        error => {
          // console.log(error);
        }
      )
    this._serv1.rfpagen().subscribe(
      data => {
        this.agen = data.Result;
      }
    )

    this._serv1.rfpsubcat(this.data.category).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  subcategory(value) {
    this._serv1.rfpsubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  input;
  // onChange(event: EventTarget) {

  //     this.input = new FormData();
  //     const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
  //     const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
  //     this.input.append('fileToUpload', target.files[0]);
  //   }
  editClick() {
  console.log( this.data.agency)
    // if(this.input){
    // this._http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input).subscribe(data => { 
    //       console.log(data);

    //       this.data.web_info = data;



    //   });}
    // if (this.data.rfp_number == null || this.data.rfp_number == '') {
    //   delete this.data.rfp_number;
    // }
    // if (this.data.rfpkey == null || this.data.rfpkey =='') {
    //   delete this.data.rfpkey;
    // } if (this.data.title == null || this.data.title == '') {
    //   delete this.data.title;
    // } if (this.data.descriptionTag == null || this.data.descriptionTag == '') {
    //   delete this.data.descriptionTag;
    // } if (this.data.states == null || this.data.states =='') {
    //   delete this.data.states;
    // } if (this.data.agency == null || this.data.agency=='') {
    //   delete this.data.agency;
    // } if (this.data.date_entered == null || this.data.date_entered=='') {
    //   delete this.data.date_entered;
    // }
    // if (this.data.due_date == null || this.data.due_date=='') {
    //   delete this.data.due_date;
    // }
    // if (this.data.web_info == null || this.data.web_info=='') {
    //   delete this.data.web_info;
    // }
    // if (this.data.rfp_reference == null || this.data.rfp_reference=='') {
    //   delete this.data.rfp_reference;
    // }
    // if (this.data.category == null || this.data.category=='') {
    //   delete this.data.category;
    // }
    // if (this.data.subcat == null || this.data.subcat=='') {
    //   delete this.data.subcat;
    // } if (this.data.seoTitleUrl == null || this.data.seoTitleUrl=='') {
    //   delete this.data.seoTitleUrl;
    // }

    // if (this.data.bid_type == null || this.data.bid_type=='') {
    //   delete this.data.bid_type;
    // } if (this.data.agency_type == null || this.data.agency_type=='') {
    //   delete this.data.agency_type;
    // } if (this.data.city_or_county == null || this.data.city_or_county=='') {
    //   delete this.data.city_or_county;
    // }
    // if (this.data.city == null || this.data.city=='') {
    //   delete this.data.city;
    // }
    // if (this.data.open_rfp == null || this.data.open_rfp=='') {
    //   delete this.data.open_rfp;
    // }
   
    
    this._serv.update_rfp(this.data.id, this.data.rfp_number, this.data.rfpkey, this.data.title, this.data.descriptionTag, this.data.state, this.data.agency, this.data.date_entered, this.data.due_date, this.data.web_info, this.data.rfp_reference, this.data.category, this.data.subcat, this.data.seoTitleUrl, this.data.bid_type, this.data.agency_type, this.data.city_or_county, this.data.city, this.data.open_rfp, this.record_added, this.data.data_model,this.data.oldcategory).subscribe(
      data => {

        if (data) {
          swal({
            type: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }
        this.dialogRef.close();

      }, error => {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }

    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
