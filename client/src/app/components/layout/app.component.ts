import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../authorization/authorization.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public currentUser = null;

  constructor (private authService: AuthorizationService,
               private router : Router) {
  }

  ngOnInit():void {
    this.getAuth();
  }

  getAuth() {
    let object = this;

    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser && this.currentUser['token']) {
      this.authService.isAuthByToken(this.currentUser['token'])
          .subscribe(data=>{
            if (data.status) {
              object.currentUser = object.currentUser;
            } else {
              object.authService.removeSession();
            }
          })
    }
  }

  logOut() {
    let object = this;

    this.authService.logOut(this.currentUser.token)
        .subscribe(data=>{
          object.authService.removeSession();
          object.router.navigate(['']);
          window.location.reload();
        });
  }

}
