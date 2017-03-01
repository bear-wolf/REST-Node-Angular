import { Component, OnInit, Renderer } from '@angular/core';
import {Router } from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../user/user.service";
import {UserValidator} from "../user/user.validator";
import {Subscription} from "rxjs";
import {AuthorizationService} from "./authorization.service";

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
      private authService: AuthorizationService
  ) {
      console.log('authorization()');
  }

  ngOnInit() {

    this.user = new FormGroup({
      email: new FormControl('', UserValidator.required),
      password: new FormControl('', UserValidator.required)
    });
  }

  logIn(model:FormGroup) {
      let object = this;

    this.submitted = true;
    if (model.valid) { //++++
      this.authService.logIn(model.value.email, model.value.password)
          .subscribe((data:any) =>{
              if (data.status) {
                  data.body.token = data.token;
                  object.authService.addSession(JSON.stringify(data.body));
                  object.router.navigate(['']);
              } else {
                  object.message = 'User is not exist'
              }
          },
          error =>{
              object.message = error.message;
          })
    }
  }

  logOut() {
    this.authService.removeSession();
    this.router.navigate(['']);
  }
}
