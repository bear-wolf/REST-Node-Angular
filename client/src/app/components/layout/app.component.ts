import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public currentUser = null;

  constructor (private userService: UserService,
               private router : Router) {
    console.log('AppComponent')
  }

  ngOnInit():void {
    let object = this,
        user = this.userService.getCurrentUser();


    if (user) {
      object.currentUser = user;
    }
  }

  logOut() {
    let object = this;

    this.userService.logOut()
        .subscribe(data=>{
          object.router.navigate(['']);
        });
  }

}
