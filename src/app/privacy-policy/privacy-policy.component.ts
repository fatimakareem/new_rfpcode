import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta) { }
  ngOnInit() {
    this.Title.setTitle( 'Privacy Policy |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }
}
