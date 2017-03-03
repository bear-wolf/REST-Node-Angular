import {Component, OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { // OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked
  users: User[];
  title: string;
  usersOfCount = 0;
  isChildRoute: boolean;

  constructor(
      private userService: UserService
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

    // ngOnChanges(){
    //   console.log('ngOnChanges');
    // }
    // ngDoCheck(){
    //   console.log('ngDoCheck');
    // }
    // ngAfterContentInit(){
    //     console.log('ngAfterContentInit');
    // }
    // ngAfterContentChecked(){
    //     console.log('ngAfterContentChecked');
    // }
    // ngAfterViewInit(){
    //     console.log('ngAfterViewInit');
    // }
    // ngAfterViewChecked(){
    //     console.log('ngAfterViewChecked');
    // }
    // ngOnDestroy(){
    //     console.log('ngOnDestroy');
    // }
}
