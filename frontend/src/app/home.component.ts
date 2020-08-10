import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls:['home.component.css']
})
export class HomeComponent {
  
  showFiller = false;
  constructor (public apiService :ApiService) {}
   homeuser
  ngOnInit() {
     this.apiService.getHomeUser().subscribe(profile => {
       //console.log(profile)
       this.homeuser=profile[0]
       console.log(this.homeuser.email)
     });
  }
}
