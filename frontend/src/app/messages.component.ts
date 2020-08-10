import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'messages',
  template: `<div *ngFor =" let message of apiService.messages">
  <mat-card>{{message.message}}</mat-card>
</div>
  <mat-expansion-panel hideToggle>
    <mat-expansion-panel-header>
      <mat-panel-title>
        This is the expansion title
      </mat-panel-title>
      <mat-panel-description>
        This is a summary of the content
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>This is the primary content of the panel.</p>
  </mat-expansion-panel>
  <mat-expansion-panel (opened)="panelOpenState = true"
                       (closed)="panelOpenState = false">
    <mat-expansion-panel-header>
      <mat-panel-title>
        Self aware panel
      </mat-panel-title>
      <mat-panel-description>
        Currently I am {{panelOpenState ? 'open' : 'closed'}}
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>I'm visible because I am open</p>
  </mat-expansion-panel>



  `
})
export class MessagesComponent {
  
  panelOpenState = false;
  constructor (public apiService :ApiService) {}

  ngOnInit() {
     this.apiService.getMessages();
  }
}
