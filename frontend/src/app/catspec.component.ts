import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'catspec',
  templateUrl: 'catspec.component.html',
  styleUrls: ['catspec.component.css']
})
export class CatSpecComponent {
    catspec 
    name
  heartcolor = "black"
  panelOpenState = false;
  constructor (public apiService :ApiService,private _snackBar: MatSnackBar, private route : ActivatedRoute) {}

  ngOnInit() {
    var id = this.route.snapshot.params.id
    this.name=id
    this.apiService.getCatspecs(id).subscribe(res => {
        this.catspec = res
        console.log(this.catspec)
    })
   //console.log(this.catspec)
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
  clipboard(){
    this._snackBar.open('Copied to Clipboard','close ', {
      duration: 2000,
    });
  }
  post(){
      console.log(this.catspec)
  }
}
