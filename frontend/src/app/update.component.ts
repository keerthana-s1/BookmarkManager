import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute} from '@angular/router'



@Component({
  selector: 'update',
  templateUrl: 'update.component.html' ,
  styleUrls:['form.component.css']
})
export class UpdateComponent {
   
    RecData
    visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    categories
  constructor (public apiService :ApiService,private _snackBar: MatSnackBar,private route : ActivatedRoute) {}

  ngOnInit() {
    var id = this.route.snapshot.params.id
    this.apiService.getBMUpdate(id).subscribe(data => {
       this.RecData= data
       console.log(this.RecData)
    })
    
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.RecData.tags.push({tag: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.RecData.tags.indexOf(tag);

    if (index >= 0) {
      this.RecData.tags.splice(index, 1);
    }
  }

  post() {
    this.apiService.getHomeUser().subscribe(profile =>{
     this.RecData.OwnerID= profile[0]._id
     console.log(this.RecData)
    })
    this._snackBar.open('Bookmark edited','close ', {
      duration: 2000,
    });
   // console.log(this.BMData)
         this.apiService.UpdateBM(this.RecData)
}
  
}
