import {
    Component, OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked,
    AfterViewInit
} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./../../model/user";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck { // OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked
  users: Observable<User[]>;
  title: string;
  usersOfCount = 0;

  constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.get();
  }

  get(){
      this.userService.getUsersAsObserver
          .map((data)=>{ return JSON.parse(data['_body']);})
          .subscribe(
          (data)=> {
              if (data['status']) {
                  this.users = Observable.of(data['body']);
                  this.usersOfCount = data['body'].length;
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
    ngDoCheck(){
        if (this.route.queryParams['value']['reload']) {

            this.router.navigateByUrl('/users');
            this.get();
        }
    }
    // ngAfterViewChecked(){
    //     console.log('ngAfterViewChecked');
    // }
    // ngOnDestroy(){
    //     console.log('ngOnDestroy');
    // }
}
