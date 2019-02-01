import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta) { }

  ngOnInit() {
    this.Title.setTitle( 'Terms |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }

}
