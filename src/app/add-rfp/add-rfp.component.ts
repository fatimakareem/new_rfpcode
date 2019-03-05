import { Component, OnInit, Inject } from '@angular/core';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
 import { AdvanceService } from '../advance-search/advance.service';
 import swal from 'sweetalert2';
 import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-add-rfp',
  templateUrl: './add-rfp.component.html',
  styleUrls: ['./add-rfp.component.scss'],
  providers: [PagerService, AllRfpsService]
})
export class AddRfpComponent implements OnInit {
  data:any=[];
  agency_show:boolean=false;
  category_show:boolean=false;
  subcate_show:boolean=false;

  rfpkey = ''; statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  rfp_number;
  title;
  governmentbidsusers;
  descriptionTag;
  states; sub_categories;
  id; web_infoo;
   subcat; seoTitleUrl; bid_type; agency_type; city_or_county; city;
  date_entered; due_date; web_info; rfp_reference;
  constructor(private _serv1: AdvanceService, private _serv: AllRfpsService,private router: Router ) {
    swal({
      title: 'Enter Profile URL',
      // html: ' Enter you email address to receive a link allowing you to reset your password.',
      input: 'text',
      allowOutsideClick: false,
      showCancelButton : true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      inputPlaceholder: 'Enter Profile URL'
    }).then((text) => {
      // alert(result)
      // if (url) {
        this._serv.post_url(text).subscribe(
          data => {
    if(data){
      this.governmentbidsusers=data.id
    }else{
      
      delete this.governmentbidsusers;
     
    }
          });
      // }else{
      //   swal(
      //     'Please Enter Profile URL',
      //     'Invalid!',
      //     'error'
      // )
      // }
     
    }
    ).catch(error => {
      this.router.navigate(['/admin-panel']);
    })
   }
  acgeny_check(){
    this.agency_show=true;
      }
      cat_check(){
        this.category_show=true;
      }
      subchk(){
        this.subcate_show=true;
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
  open_rfp;record_added;agency;category
  editClick() {
    if (this.rfp_number == null || this.rfp_number == '') {
      delete this.rfp_number;
    }
    if (this.rfpkey == null || this.rfpkey =='') {
      delete this.rfpkey;
    } if (this.title == null || this.title == '') {
      delete this.title;
    } if (this.descriptionTag == null || this.descriptionTag == '') {
      delete this.descriptionTag;
    } if (this.states == null || this.states =='') {
      delete this.states;
    } if (this.agency == null || this.agency=='') {
      delete this.agency;
    } if (this.date_entered == null || this.date_entered=='') {
      delete this.date_entered;
    }
    if (this.due_date == null || this.due_date=='') {
      delete this.due_date;
    }
    if (this.web_info == null || this.web_info=='') {
      delete this.web_info;
    }
    if (this.rfp_reference == null || this.rfp_reference=='') {
      delete this.rfp_reference;
    }
    if (this.category == null || this.category=='') {
      delete this.category;
    }
    if (this.subcat == null || this.subcat=='') {
      delete this.subcat;
    } if (this.seoTitleUrl == null || this.seoTitleUrl=='') {
      delete this.seoTitleUrl;
    }

    if (this.bid_type == null || this.bid_type=='') {
      delete this.bid_type;
    } if (this.agency_type == null || this.agency_type=='') {
      delete this.agency_type;
    } if (this.city_or_county == null || this.city_or_county=='') {
      delete this.city_or_county;
    }
    if (this.city == null || this.city=='') {
      delete this.city;
    }
    if (this.open_rfp == null || this.open_rfp=='') {
      delete this.open_rfp;
    }
    // if(this.input){
    // this.http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input,{ responseType: 'text' }).subscribe(data => { 
    //       console.log(data);

    //       this.model.web_info = data;



    //   });}
    this._serv.add_rfp(this.rfpkey,this.governmentbidsusers,this.title,this.descriptionTag,this.states,this.agency,this.date_entered,this.due_date,this.web_info,this.rfp_reference,this.category,this.subcat,this.seoTitleUrl,this.bid_type,this.agency_type,this.city_or_county,this.city,this.open_rfp,this.record_added).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'RFP Added successfully!',
          showConfirmButton: false,
          timer: 1500,width: '512px',
        });
      });
  }
}

