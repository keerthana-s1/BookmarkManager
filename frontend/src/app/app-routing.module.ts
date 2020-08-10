import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register.component'
import {LoginComponent} from './login.components'
import { from } from 'rxjs';
import { UsersComponent } from './users.component';
import {HomeComponent} from './home.component'
import {MessagesComponent} from './messages.component'
import { NewBMComponent } from './newbm.component';
import {AllComponent} from './all.components'
import { FavComponent } from './fav.component';
import {CatComponent} from './cat.components'
import {CatSpecComponent} from './catspec.component'
import {TagComponent} from './tag.component'
import {TagSpecComponent} from './tagspec.component'
import {UpdateComponent } from './update.component'
const routes: Routes = [
  {
    path:'register' , component: RegisterComponent
  },
  {
    path:'login' , component: LoginComponent
  },
  {
    path:'users' , component: MessagesComponent
  },
  {
    path:'home', component: AllComponent
  },
  {
    path:'new',component:NewBMComponent
  },
  {path:'all', component:AllComponent},
  {
    path:'fav',component:FavComponent
  },
  {
    path:'cat',component:CatComponent
  },
  {
    path:'cat/:id',component:CatSpecComponent
  },
  {
    path:'tag',component:TagComponent
  },
  {
    path:'tag/:id',component:TagSpecComponent
  },
  {
    path:'update/:id',component:UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
