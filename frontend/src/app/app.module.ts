import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {FavComponent} from './fav.component'
import {CatComponent} from './cat.components'
import {TagComponent} from './tag.component'
import {TagSpecComponent} from './tagspec.component'
import {UpdateComponent} from './update.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



import {AuthInterceptorService } from './authinterceptor.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import {AuthService} from './auth.service'
import {RegisterComponent} from './register.component'
import {MessagesComponent} from './messages.component'
import {UsersComponent} from './users.component'
import {HomeComponent} from './home.component'
import {LoginComponent} from './login.components'
import {NewBMComponent} from './newbm.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AllComponent } from './all.components';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {CatSpecComponent} from './catspec.component'
import {MatGridListModule} from '@angular/material/grid-list';
import { from } from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent, MessagesComponent,RegisterComponent,LoginComponent,UsersComponent,HomeComponent,
    NewBMComponent,AllComponent,FavComponent,CatComponent,CatSpecComponent,TagComponent,TagSpecComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatExpansionModule,
    ClipboardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatGridListModule,
    MatMenuModule
  ],
  
  providers: [ApiService,AuthService, {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
