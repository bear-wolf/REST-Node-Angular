import { Component, OnInit, Renderer } from '@angular/core';
import {Router } from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../user/user.service";
import {UserValidator} from "../user/user.validator";
import {Subscription} from "rxjs";

@Component({
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  providers: [UserService],
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
    message: string;
  user: FormGroup;
  params = {};
  submitted: boolean;

  constructor(
      private router: Router,
      private userService: UserService
  ) {
      console.log('authorization()');
  }

  ngOnInit() {
    if (this.userService.getCurrentUser()) {
        this.router.navigate(['/']); // go home
    }

    this.user = new FormGroup({
      email: new FormControl('', UserValidator.required),
      password: new FormControl('', UserValidator.required)
    });
  }

  logIn(model:FormGroup) {
      let object = this;

    this.submitted = true;
    if (model.valid) { //++++
      this.userService.logIn(model.value.email, model.value.password)
          .subscribe((data:any) =>{
              if (data.body.length) {
                  data.body[0].token = data.token;
                  object.userService.addSession(JSON.stringify(data.body[0]));
                  object.router.navigate(['']);
              } else {
                  object.message = 'User is not exist'
              }
            //object.addUser(model.value);
          },
          error =>{
              object.message = error.message;
          })
    }
  }

  logOut() {
    this.userService.removeSession();
    this.router.navigate(['']);
  }
}
