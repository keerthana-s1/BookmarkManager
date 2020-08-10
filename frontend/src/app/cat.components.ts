import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'cat',
  templateUrl: 'cat.components.html',
  styleUrls:['cat.component.css']

})
export class CatComponent {
  categories 
  panelOpenState = false;
  constructor (public apiService :ApiService,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.apiService.getCat().subscribe(profile => {
        console.log(profile)
        this.categories = profile
    })
   // console.log(this.categories)
    this.apiService.getBMs();
  }
  changestat(bm)
  {
      console.log('trying to change')
      bm.favourite = !bm.favourite
      this.apiService.changeStat(bm)
  }
  findcolor(stat)
  {
      if(stat)
      return "warn"
      else return "black"
  }
  delete(data)
  {
    this.apiService.delBM(data)
    this._snackBar.open('Bookmark Deleted','close ', {
        duration: 2000,
      });
  }
  filterbycat(cat){
      return this.apiService.bookmarks.filter(b=> b.Category == cat)
  }

  clipboard(){
    this._snackBar.open('Copied to Clipboard','close ', {
      duration: 2000,
    });
  }
}
