import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../authorization/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public currentUser = null;

  constructor (private authService: AuthorizationService,
               private router : Router) {
    console.log('AppComponent')
  }

  ngOnInit():void {
    this.getAuth();
  }

  getAuth() {
    let object = this,
        user = this.authService.getCurrentUser();

    if (user) {
      object.currentUser = user;
    }
  }

  logOut() {
    let object = this;

    this.authService.logOut()
        .subscribe(data=>{
          object.router.navigate(['']);
        });
  }

}
