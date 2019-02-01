import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rfp-as-service',
  templateUrl: './rfp-as-service.component.html',
  styleUrls: ['./rfp-as-service.component.css']
})
export class RfpAsServiceComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta) { }

  ngOnInit() {
    this.Title.setTitle( 'RFP As Service |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }

}
