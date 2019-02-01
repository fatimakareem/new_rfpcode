import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent {
  constructor(private Title: Title, private meta: Meta) {}
  ngOnInit() {
    this.Title.setTitle( 'Our Expert Team |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
