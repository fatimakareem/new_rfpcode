import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})

export class WhatWeDoComponent {
  constructor(private Title: Title, private meta: Meta) { }

  ngOnInit() {  this.Title.setTitle( 'What We Do? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
