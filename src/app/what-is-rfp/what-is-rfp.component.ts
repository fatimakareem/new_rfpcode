import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-what-is-rfp',
  templateUrl: './what-is-rfp.component.html',
  styleUrls: ['./what-is-rfp.component.css']
})
export class WhatIsRfpComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta) { }

  ngOnInit() {  this.Title.setTitle( 'What is RFPGurus? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }

}
