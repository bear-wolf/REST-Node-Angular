import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../authorization/authorization.service";
import {User} from "../../model/user";

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
  public currentUser:User = null;

  constructor (
      private authService: AuthorizationService) {
  }

  ngOnInit():void {
    this.currentUser = this.authService.getCurrentUser();
  }

}
