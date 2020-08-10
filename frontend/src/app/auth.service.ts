import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export  class AuthService {
    messages 
    constructor(private http: HttpClient) {}
    TOKEN_KEY ='token'
    
   get token() {
       return localStorage.getItem(this.TOKEN_KEY)
   }

   logout() {
       localStorage.removeItem(this.TOKEN_KEY)
   }

   get isAuthenticated() {
       return !!localStorage.getItem(this.TOKEN_KEY)
   }

    UserRegistration(registerData) {
        this.http.post<any>('http://localhost:3000/register',registerData).subscribe(res => {
            localStorage.setItem(this.TOKEN_KEY,res.token)
        })
    }

    loginUser(loginData) {
       this.http.post<any>('http://localhost:3000/login',loginData).subscribe(res => {
            console.log(res)
            localStorage.setItem(this.TOKEN_KEY,res.token)
        })
    }
}