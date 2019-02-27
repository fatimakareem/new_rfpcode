import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { PaymentmethodsService } from './paymentmethods.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';import { ErrorStateMatcher} from '@angular/material';

import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { noSpaceValidator } from './noSpaceValidator.component';
import { RegisterService } from '../../registered/register.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';

export interface card_opeation {
  value: string;
  viewValue: string;
}
export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
declare interface ValidatorFn {
  (c: AbstractControl): {
      [key: string]: any;
  };
}
@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.scss'],
  // providers: [RegisterService,PaymentmethodsService]
})
export class PaymentmethodsComponent implements OnInit, OnDestroy {
  var_type_atm= new FormControl('');
  cardtype;
  public show: boolean = false;
  check_value: boolean = false;
  ccv1: boolean = false;
card_opeation=[
{value: 'Visa', viewValue: 'Visa Card'},
{value: 'Mastercard', viewValue: 'Master Card'},
{value: 'American Express', viewValue: 'American Express'},
{value: 'Discover', viewValue: 'Discover'}

];
  public buttonName: any = 'Show';
  expirydate;
  public show2: boolean = false
  endRequest;msg;
 public cardsmask=[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  // public mask = [/[0,1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  chek(val){
    // this.expirydate=val.toString().slice(3,7);
    this.expirydate=val.toString().slice(3,5);
    console.log(this.expirydate,'jj')
  }
  public mask=function(rawValue) {
   
    // add logic to generate your mask array  
    if (rawValue && rawValue.length > 0) {
        if (rawValue[0] == '0' || rawValue[5] == '1') {
            return [/[01]/, /[1-9]/, '/',  /[0-9]/, /[0123456789]/];
        } else {
            return [/[01]/, /[0-2]/, '/',  /[0-9]/, /[0123456789]/];
        }
    }
    return [/[01]/, /[0-9]/, '/',  /[0-9]/, /[0123456789]/];
    
}
  cardexist: boolean = false;
  // form = new FormGroup({
  //   /////
  //   cardnumber: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   cardnumber2: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   ccv: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(3),
  //     Validators.pattern('^[0-9]*$')
  //   ]),
  //   ccv2: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(4),
  //     Validators.pattern('^[0-9]*$')
  //   ]),
  //   expirydate: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
  //   ]),
  //   cardnickname: new FormControl('', [
  //     Validators.minLength(3),
  //     Validators.maxLength(50),
  //     Validators.required,
  //     // noSpaceValidator.cannotContainSpace,
  //     Validators.pattern('^[a-zA-Z _.]+$')
  //   ]),

  //   zip: new FormControl('', [
  //     Validators.maxLength(5),
  //     Validators.required,
  //     noSpaceValidator.cannotContainSpace,
  //     Validators.pattern('^[0-9]*$')
  //   ]),
  //   address: new FormControl('', [Validators.required
  //   ]),
  //   state: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   city: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   country: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   var_type_atm: new FormControl('', [
  //     Validators.required,
  //   ]),
   
  //   // pin: new FormControl('', [
  //   //   Validators.maxLength(4),
  //   //   Validators.pattern('^[0-9]*$'),
  //   //   Validators.required,
  //   //   noSpaceValidator.cannotContainSpace
  //   // ]),
  // });
  private productsSource;
  currentProducts;
  ccv2;
  form: FormGroup;
  cardnumber2;
  var_box_check: boolean = false;
  destroy_value;
 public cardmask;
//  public cardsmask;
  vin_Data = { "city": "", "state": "" };
  private sub: Subscription;
  flipclass = 'credit-card-box';
  constructor(private formBuilder: FormBuilder,private _nav: Router, private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private _serv: RegisterService,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
    this.cardnumber = true;
    this.cardnumber2 = false;
    this.ccv = true;
    this.ccv2 = false;
  }
  ShowButton(var_type_atm) {
    this.cardtype = var_type_atm;
    if (var_type_atm == "American Express") {
     this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardnumber = false;
      this.form.controls.cardnumber.reset();
      this.cardnumber2 = true;
      this.ccv = false;
      this.form.controls.ccv.reset();
      this.ccv2 = true;
    }
    else if (var_type_atm == "Visa") {
     this.cardsmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardnumber2 = false;
      this.form.controls.cardnumber2.reset();
      this.cardnumber = true;
      this.ccv2 = false;
      this.form.controls.ccv2.reset();
      this.ccv = true;
    }
    else if (var_type_atm == "Mastercard") {
      this.cardsmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
       this.cardnumber2 = false;
       this.form.controls.cardnumber2.reset();
       this.cardnumber = true;
       this.ccv2 = false;
       this.form.controls.ccv2.reset();
       this.ccv = true;
     } else{
      this.cardsmask=[/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
       this.cardnumber2 = false;
       this.form.controls.cardnumber2.reset();
       this.cardnumber = true;
       this.ccv2 = false;
       this.form.controls.ccv2.reset();
       this.ccv = true;
     }
  }
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this._serv.zipcode(zipcode1).subscribe(
        data => {
          this.form.controls['city'].setValue(data.city);
          this.form.controls['state'].setValue(data.state);
          this.form.controls['country'].setValue(data.country);
        },
        error => {
          // console.log(error)
        });
    }
  }
  
  updefault;
  setcard(status,autopay,id, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry) {
    if (status == false) {
      this.updefault = true;
    }
    else if (status == true) {
      this.updefault = false;
    }

    this.endRequest = this.serv.updateCard(this.updefault,autopay,id, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry).subscribe(Data => {
      // swal({
      //   type: 'success',
      //   title: 'Credit Card Details Are Updated!',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
}
resolved(captchaResponse: string) {
}

displayFieldCss(form: FormGroup, field: string) {
    return {
        'has-error': this.isFieldValid(form, field),
        'has-feedback': this.isFieldValid(form, field)
    };
}
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
}
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Payment Methods | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Payment Methods | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Payment Methods |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this.getCards();
    this.form = this.formBuilder.group({
      cardnumber: ['', Validators.compose([Validators.required])],
      cardnumber2: ['', Validators.compose([Validators.required])],
      ccv: ['', Validators.compose([Validators.required])],
      ccv2: ['', Validators.compose([Validators.required])],
      expirydate: ['', Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      zip: ['', Validators.compose([Validators.required, Validators.maxLength(5),
        Validators.pattern('^[0-9]*$')])],
      cardnickname: ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('^[a-zA-Z _.]+$')])],
    
      address: ['', Validators.compose([Validators.required])],
     
      state: ['', Validators.compose([Validators.required])],
     
     
      var_type_atm:['', Validators.compose([Validators.required])],
  });
  }
  cardid = "";
  card;
  default: boolean = false;
  
  name;
  cardnumber;
  ccv;

  address;
  zip;
  city;
  state;
  country;
  id;
  setautopay:boolean=false;
  autopay;
  get(status, id, name, number, cvc, expDate, street_address, zipcode, city, state, country,autopay) {
    this.id = id;
    this.name = name;
    this.cardnumber = number;
    this.ccv = cvc;
    this.expirydate = expDate;
    // this.pin = pinCode;
    this.address = street_address;
    this.zip = zipcode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.updefault = status;
    this.autopay=autopay;
  }
  updateSingleCard(status,autopay, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry) {
    console.log(status)
    this.endRequest = this.serv.updateCard(status,autopay, this.id, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit Card Details Are Updated!',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      })
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  deleteSingleCard(id) {
    swal({
      title: 'Are you sure you want to delete this Card? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // alert(result)
      if (result==true) {
      
  this.serv.deleteCard(id).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit Card Is Deleted!',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      })
      this.getCards();
    },
      error => {
        if (error.status == 204) {
          swal({
            type: 'error',
            title: 'No Credit Card Found!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
    }})
  }
  date;
  changed() {
    console.log(this.default)
    console.log(this.autopay)
  }
  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  check_value_get: boolean = false;
  add() {

    // console.log(this.default)
    this.date = this.form.value['expirydate'];
    // this.date = moment(this.date).format('YYYY-MM') + '-01';
    // name,pin,address,zip,city,state,country,cardno, ccv, expiryDate
    // alert(this.var_type_atm);
    
    if (this.cardtype == "American Express") {
      if (this.form.controls.cardnickname.valid && this.form.controls.cardnumber2.valid && this.form.controls.ccv2.valid
        && this.form.controls.expirydate.valid && this.form.controls.address.valid && this.form.controls.zip.valid
        && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid) {
        this.endRequest = this.serv.addCard(this.default, this.form.value['cardnickname'], this.form.value['address'], this.form.value['zip'], this.form.value['city'], this.form.value['state'], this.form.value['country'], this.form.value['cardnumber2'].split('-').join(''), this.form.value['ccv2'],this.date.split('/').join(''),this.cardtype,this.setautopay).subscribe(Data => {
          console.log(Data)
          swal({
            type: 'success',
            title: 'Payment Method Is Listed!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
          this.getCards();
         

        },
          error => {
            console.log(error.status)
         
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please Enter Valid Filed',
          showConfirmButton: false,
          timer: 1500,width: '512px',
        })
      }
    }

    else {
      if (this.form.controls.cardnickname.valid && this.form.controls.cardnumber.valid && this.form.controls.ccv.valid
        && this.form.controls.expirydate.valid && this.form.controls.address.valid && this.form.controls.zip.valid
        && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid) {
        this.endRequest = this.serv.addCard(this.default, this.form.value['cardnickname'], this.form.value['address'], this.form.value['zip'], this.form.value['city'], this.form.value['state'], this.form.value['country'], this.form.value['cardnumber'].split('-').join(''), this.form.value['ccv'],this.date.split('/').join(''),this.cardtype,this.setautopay).subscribe(Data => {
          swal({
            type: 'success',
            title: 'Payment Method Is Listed!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          });
          this.getCards();
          this.form.reset();

        },
          error => {
           
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please Enter Correct Details!',
          showConfirmButton: false,
          timer: 1500,width: '512px',
        })
      }

    }
  }
  res;
  message;
  getCards() {
    this.endRequest = this.serv.showCards().subscribe(Data => {
      this.res = Data;
      this.message = Data.message;
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Credit Card Not Found!',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
      })
  }
  exist_card(card1) {
    // console.log("sdfsdfsdfsdfsdf",email1);
    this.serv.Atm_card_exist(card1).subscribe(
      data => {
        //  alert(data);
      },
      error => {
        if (error.status == 302) {
          // alert(this.cardexist)
          this.cardexist = true;
        }
        //  console.log("dsadas",error)
      }
    );

  }
  ngOnDestroy() {
    // this.serv.showCards();
  }
}