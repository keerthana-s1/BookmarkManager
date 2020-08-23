import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'messages',
  template: `

<mat-expansion-panel hideToggle *ngFor =" let bookmark of apiService.favbookmarks" >
    <mat-expansion-panel-header>
      <mat-panel-title>
        {{bookmark.name}}
      </mat-panel-title>
      <mat-panel-description>
        {{bookmark.Category}}
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>
    <button mat-icon-button color="{{findcolor(bookmark.favourite)}}" (click)="changestat(bookmark)" aria-label="Example icon button with a heart icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button  (click)="changevis(bookmark)"  matTooltip="Change Visibility">
        <mat-icon *ngIf="isprivate(bookmark)">lock</mat-icon>
        <mat-icon *ngIf="!isprivate(bookmark)">lock_open</mat-icon>
      </button>
      <button mat-icon-button  matTooltip="Edit" [routerLink]="['/update',bookmark._id]">
      <mat-icon>edit</mat-icon>
    </button>
      <button mat-icon-button  (click)="delete(bookmark); " matTooltip="Delete" onClick="window.location.reload();">
      <mat-icon>delete</mat-icon>
    </button>

    <button mat-icon-button cdkCopyToClipboard={{bookmark.Url}} matTooltip="Copy to Clipboard" (click)="clipboard()">
    <mat-icon>file_copy</mat-icon>
  </button>
    <a href="{{bookmark.Url}}" target="_blank"><button mat-raised-button color="primary" >Visit Site</button></a>
    </p>
  </mat-expansion-panel>

  `
})
export class FavComponent {
  heartcolor = "black"
  panelOpenState = false;
  constructor (public apiService :ApiService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
     this.apiService.getFavBMs();
  }
  changestat(bm)
  {
      
      bm.favourite = !bm.favourite
      this.apiService.changeStat(bm)
  }
  findcolor(stat)
  {
      if(stat)
      return "warn"
      else return "black"
  }
  isprivate(bm) {
    if(bm.private==true)
    return true 
    else return false
  }
  changevis(bm)
  {   
      console.log('trying to change')
      bm.private = !bm.private
      this.apiService.changeVisStat(bm)
      
      
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
}
