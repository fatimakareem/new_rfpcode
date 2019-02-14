import { Component, OnInit, Inject } from '@angular/core';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service'; import { AdvanceService } from '../advance-search/advance.service';

@Component({
  selector: 'app-add-rfp',
  templateUrl: './add-rfp.component.html',
  styleUrls: ['./add-rfp.component.scss'],
  providers: [PagerService, AllRfpsService]
})
export class AddRfpComponent implements OnInit {
  data:any=[];
  rfpkey = ''; statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  rfp_number = '';
  title = '';
  descriptionTag = '';
  states = ''; sub_categories;
  agency = ''; id; web_infoo; open_rfp;
  category; subcat; seoTitleUrl; bid_type; agency_type; city_or_county; city;
  date_entered = ''; due_date = ''; web_info; rfp_reference = '';
  constructor(private _serv1: AdvanceService, private _serv: AllRfpsService ) { }

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

    
  }
  subcategory(value) {
    this._serv1.rfpsubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  editClick(updatedtitle, updatedrfp_number, uprfpkey, updateddescriptionTag, updatedstates, updatedagency, updateddate_entered, updateddue_date, updatedrfp_reference, updatedcategory, updatedsubcat, updatedseoTitleUrl, updatedbid_type, updatedagency_type, updatedcity_or_county, updatedcity, updatedweb_info, updatedopen_rfp) {

    // if(this.input){
    // this.http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input,{ responseType: 'text' }).subscribe(data => { 
    //       console.log(data);

    //       this.model.web_info = data;



    //   });}
    this._serv.add_rfp(this.id, updatedtitle, updatedrfp_number, uprfpkey, updateddescriptionTag, updatedstates, updatedagency, updateddate_entered, updateddue_date, updatedweb_info, updatedrfp_reference, updatedcategory, updatedsubcat, updatedseoTitleUrl, updatedbid_type, updatedagency_type, updatedcity_or_county, updatedcity, updatedopen_rfp).subscribe(
      data => {

      });
  }
}
