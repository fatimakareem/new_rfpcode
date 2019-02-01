import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-features-comparison',
  templateUrl: './features-comparison.component.html',
  styleUrls: ['./features-comparison.component.css']
})
export class FeaturesComparisonComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta) { }
  ngOnInit() { this.Title.setTitle( 'Features Comparison |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }

}
