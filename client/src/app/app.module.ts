import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/layout/app.component';
import { UserComponent } from './components/user/user.component';
import {appRoutes} from "./routes";
import {RouterModule} from "@angular/router";
import { UserAddComponent } from './components/user/user-add/user-add.component';
import {UserService} from "./components/user/user.service";
import {HomeComponent} from "./components/home/home.component";
import {AuthorizationComponent} from "./components/authorization/authorization.component";
import {AuthorizationService} from "./components/authorization/authorization.service";
import {NgbModule, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
// import {FORM_PROVIDERS, FORM_DIRECTIVES} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserAddComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule, // for bootstrap
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, FormBuilder,
    NgbDropdownConfig, // bootstrap dropdown
    AuthorizationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
