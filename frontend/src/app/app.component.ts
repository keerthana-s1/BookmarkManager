import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import {ApiService} from './api.service'
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFiller = false;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  bmnames 
  fbmnames
  constructor(public authService:AuthService, public apiService:ApiService) {}
  title = 'Bookmark Manager';
  selected
  ngOnInit() {
    this.apiService.getBMnames().subscribe(list => {
        this.bmnames = JSON.stringify(list)
        //console.log(this.bmnames)

    })

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var final = []
    var finallist =[]
   // console.log(this.bmnames)
    this.apiService.getBMnames().subscribe(list => {
      //this.bmnames = JSON.stringify(list)
     var keys = Object.keys(list)
     keys.forEach(function(key){
       final.push(list[key])
     })
     //console.log(final)
     finallist = final.filter(option => {
      // console.log(option.includes(filterValue))
       return option.toLowerCase().includes(filterValue)
     })
     //console.log('inside',finallist)
    }
    
  )
  //console.log(finallist)
    return final
  }
    
}
