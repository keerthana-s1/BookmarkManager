import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'register',
  template: `
    <mat-card class="card">
    <mat-card-header>
    <mat-card-title> <h4>Register new User</h4>
    </mat-card-title>
    </mat-card-header>
    <mat-card-content>
    <form >
      <mat-form-field >
      <mat-label>Email</mat-label>
      <input [(ngModel)]="registerData.email" matInput type="email" name="email"  placeholder="Ex. pat@example.com">
      </mat-form-field><br>
      <mat-form-field >
      <mat-label>Name</mat-label>
      <input [(ngModel)]="registerData.name" matInput name="name" >
      </mat-form-field><br>
      <mat-form-field >
      <mat-label>Password</mat-label>
      <input [(ngModel)]="registerData.password" matInput type="password" name="password" >
      </mat-form-field><br>
      <button (click)="post()" mat-raised-button color=primary >Register</button>
    </form>
    </mat-card-content>
    </mat-card>
  `,
  styleUrls:['login.component.css']
})
export class RegisterComponent {
     registerData = {
         email:"",
         name:"",
         password:""
     }

     constructor (public authService :AuthService) {}

     post() {
         console.log(this.registerData)
         this.authService.UserRegistration(this.registerData)
     }
}
