import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, FormBuilder} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/layout/app.component';
import { UserComponent } from './components/user/user.component';
import {appRoutes} from "./routes";
import {RouterModule} from "@angular/router";
import { UserAddComponent } from './components/user/user-add/user-add.component';
import {UserService} from "./components/user/user.service";
import {HomeComponent} from "./components/home/home.component";
// import {FORM_PROVIDERS, FORM_DIRECTIVES} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
