import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AdminPanelComponent} from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss'],
  providers: [PagerService, AllRfpsService]
})
export class EditRfpComponent implements OnInit {
  rfpkey='';
  rfp_number='';
  title='';
  descriptionTag='';
  states='';
  agency='';id;web_infoo;open_rfp;
  category;subcat;seoTitleUrl;bid_type;agency_type;city_or_county;city;
  date_entered='';due_date='';web_info;rfp_reference='';
  constructor(private _serv: AllRfpsService,public dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
//     console.log(this.data)
//     this.rfpkey=this.data.rfpkey;
// this.rfp_number=this.data.rfp_number;
// this.title=this.data.title;
// this.descriptionTag=this.data.descriptionTag;
// this.state=this.data.state;
// this.agency=this.data.agency;
// this.date_entered=date_entered;
// this.due_date=due_date;
// this.web_infoo=web_info;
// this.rfp_reference=rfp_reference;
// this.id=id;
// this.category=category;
// this.subcat=sub_category;
// this.seoTitleUrl=seoTitleUrl;
// this.bid_type=bid_type;
// this.agency_type=agency_type;
// this.city_or_county=city_or_county;
// this.city=city;
// this.open_rfp=openrfp
  }
  editClick(updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedweb_info,updatedopen_rfp){
    // if(this.input){
    // this.http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input,{ responseType: 'text' }).subscribe(data => { 
    //       console.log(data);
       
    //       this.model.web_info = data;
        
        
        
    //   });}
    this._serv.update_rfp(this.id,updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedweb_info,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedopen_rfp).subscribe(
        data => {
            
        });
}
}
