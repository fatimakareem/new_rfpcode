import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'residential.component.html',
    styleUrls: ['./residential.component.css']
})

export class DialogOverviewExample {
    ngOnInit() {
        this.Title.setTitle( 'FAQ |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    }    
    animal: string;
    name: string;

    constructor(public dialog: MatDialog,private Title: Title, private meta: Meta) {
    }
}


