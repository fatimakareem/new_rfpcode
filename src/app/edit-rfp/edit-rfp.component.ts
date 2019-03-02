import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service'; import { AdvanceService } from '../advance-search/advance.service';
import { HttpService } from '../serv/http-service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss'],
  providers: [PagerService, AllRfpsService, AdvanceService]
})
export class EditRfpComponent implements OnInit {
  model: any = [];
  agency: boolean = false;
  category: boolean = false;
  record_added: boolean = false;
  subcate: boolean = false;
  statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];

  sub_categories;


  date_entered = ''; due_date = ''; web_info; rfp_reference = '';
  constructor(private _http: HttpService, private _serv1: AdvanceService, private _serv: AllRfpsService, public dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  acgeny_check() {
    this.agency = true;
  }
  cat_check() {
    this.category = true;
  }
  subchk() {
    this.subcate = true;
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
  
    // if(this.input){
    // this._http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input).subscribe(data => { 
    //       console.log(data);

    //       this.data.web_info = data;



    //   });}
    if (this.data.rfp_number == null) {
      delete this.data.rfp_number;
    }
    if (this.data.rfpkey == null) {
      delete this.data.rfpkey;
    } if (this.data.title == null) {
      delete this.data.title;
    } if (this.data.descriptionTag == null) {
      delete this.data.descriptionTag;
    } if (this.data.states == null) {
      delete this.data.states;
    } if (this.data.agency == null) {
      delete this.data.agency;
    } if (this.data.date_entered == null) {
      delete this.data.date_entered;
    }
    if (this.data.due_date == null) {
      delete this.data.due_date;
    }
    if (this.data.web_info == null) {
      delete this.data.web_info;
    }
    if (this.data.rfp_reference == null) {
      delete this.data.rfp_reference;
    }
    if (this.data.category == null) {
      delete this.data.category;
    }
    if (this.data.subcat == null) {
      delete this.data.subcat;
    } if (this.data.seoTitleUrl == null) {
      delete this.data.seoTitleUrl;
    }

    if (this.data.bid_type == null) {
      delete this.data.bid_type;
    } if (this.data.agency_type == null) {
      delete this.data.agency_type;
    } if (this.data.city_or_county == null) {
      delete this.data.city_or_county;
    }
    if (this.data.city == null) {
      delete this.data.city;
    }
    if (this.data.open_rfp == null) {
      delete this.data.open_rfp;
    }
   
    
    this._serv.update_rfp(this.data.id, this.data.rfp_number, this.data.rfpkey, this.data.title, this.data.descriptionTag, this.data.states, this.data.agency, this.data.date_entered, this.data.due_date, this.data.web_info, this.data.rfp_reference, this.data.category, this.data.subcat, this.data.seoTitleUrl, this.data.bid_type, this.data.agency_type, this.data.city_or_county, this.data.city, this.data.open_rfp, this.record_added, this.data.data_model).subscribe(
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
