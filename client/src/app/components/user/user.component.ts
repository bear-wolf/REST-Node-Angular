import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./../../model/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  title: string;

  constructor(
      private userService: UserService) {
    console.log('UserComponent');
  }

  ngOnInit() {
    this.userService.get().subscribe(
        (data: Array<User>)=>{
          this.users = data;
        })
  }

}
