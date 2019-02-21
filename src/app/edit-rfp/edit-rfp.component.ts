import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service'; import { AdvanceService } from '../advance-search/advance.service';
import { HttpService } from '../serv/http-service';

@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss'],
  providers: [PagerService, AllRfpsService, AdvanceService]
})
export class EditRfpComponent implements OnInit {
  model:any=[];
  rfpkey = ''; statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  rfp_number = '';
  title = '';
  descriptionTag = '';
  states = ''; sub_categories;
  agency = ''; id; web_infoo; open_rfp;
  category; subcat; seoTitleUrl; bid_type; agency_type; city_or_county; city;
  date_entered = ''; due_date = ''; web_info; rfp_reference = '';
  constructor(private _http: HttpService,private _serv1: AdvanceService, private _serv: AllRfpsService, public dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, ) { }

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
    this._serv1.rfpagencys().subscribe(
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
  editClick(updatedtitle, updatedrfp_number, uprfpkey, updateddescriptionTag, updatedstates, updatedagency, updateddate_entered, updateddue_date, updatedrfp_reference, updatedcategory, updatedsubcat, updatedseoTitleUrl, updatedbid_type, updatedagency_type, updatedcity_or_county, updatedcity, updatedweb_info, updatedopen_rfp) {
   alert(updatedrfp_reference)

    // if(this.input){
    // this._http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input).subscribe(data => { 
    //       console.log(data);

    //       this.data.web_info = data;



    //   });}
    
    this._serv.update_rfp(this.data.data_model,this.data.id, updatedtitle, updatedrfp_number, uprfpkey, updateddescriptionTag, updatedstates, updatedagency, updateddate_entered, updateddue_date, this.data.web_infoo, this.data.rfp_reference, updatedcategory, updatedsubcat, updatedseoTitleUrl, updatedbid_type, updatedagency_type, updatedcity_or_county, updatedcity, updatedopen_rfp).subscribe(
      data => {

      });
  }
}
