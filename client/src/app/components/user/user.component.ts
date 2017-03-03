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
  usersOfCount = 0;
  isChildRoute: boolean;

  constructor(
      private userService: UserService,
      private router: Router,
  ) {
      console.log('UserComponent');
      this.users = [];
  }

  ngOnInit() {
    this.get();
  }

  get(){
      this.userService.get().subscribe(
          (data)=> {
              if (data['status']) {
                  this.users = data['body'];
                  this.usersOfCount = this.users.length;
              }
          })
  }

    remove(id:number) {
        if (confirm("You really want remove it?")) {
        this.userService.remove(id)
            .subscribe(
                (data) => {
                    if (data.status) {
                        this.get();
                    }
                }
            );
        }
    }
}
