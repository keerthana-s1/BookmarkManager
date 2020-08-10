import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'login',
  templateUrl:'login.component.html' ,
  styleUrls:['login.component.css']
  
})
export class LoginComponent {
     loginData = {
         email:"",
         password:""
     }

     constructor (public authService :AuthService) {}

     post() {
         console.log(this.loginData)
         this.authService.loginUser(this.loginData)
     }
}
