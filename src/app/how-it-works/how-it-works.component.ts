import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta) { }
  ngOnInit() {this.Title.setTitle( 'How It Works |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }
}
