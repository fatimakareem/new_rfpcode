import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-why-rfpgurus',
  templateUrl: './why-rfpgurus.component.html',
  styleUrls: ['./why-rfpgurus.component.css']
})

export class WhyRfpgurusComponent {
  constructor(private Title: Title, private meta: Meta) { }

  ngOnInit() {  this.Title.setTitle( 'Why RFPGurus? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
