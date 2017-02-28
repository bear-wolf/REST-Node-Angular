import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  title: string;
  isChildRoute: boolean;

  constructor(
      private userService: UserService,
      private router: Router,
  ) {
      console.log('UserComponent');

      this.isChildRoute = false;
  }

  ngOnInit() {
    this.userService.get().subscribe(
        (data: Array<User>)=>{
          this.users = data;
        })
  }

}
