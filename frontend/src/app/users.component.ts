import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'messages',
  template: `<div *ngFor =" let user of apiService.users">
  <mat-card>{{user.email}}</mat-card>
</div>
  `
})
export class UsersComponent {
  

  constructor (public apiService :ApiService) {}

  ngOnInit() {
     this.apiService.getUsers();
  }
}
