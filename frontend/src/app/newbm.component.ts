import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'newfrom',
  templateUrl: 'newbm.component.html' ,
  styleUrls:['form.component.css']
})
export class NewBMComponent {
    BMData = {
        name:"",
        Url:"",
        OwnerID: "",
        Category:"",
        tags:[]
    }
    visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    categories
  constructor (public apiService :ApiService,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.apiService.getCat().subscribe(list => {
        this.categories = list
    })
    
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.BMData.tags.push({tag: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.BMData.tags.indexOf(tag);

    if (index >= 0) {
      this.BMData.tags.splice(index, 1);
    }
  }

  post() {
    this.apiService.getHomeUser().subscribe(profile =>{
     this.BMData.OwnerID= profile[0]._id
    // console.log(this.BMData)
    })
    this._snackBar.open('New Bookmark Added','close ', {
      duration: 2000,
    });
    console.log(this.BMData)
         this.apiService.addBM(this.BMData)
}
  
}
