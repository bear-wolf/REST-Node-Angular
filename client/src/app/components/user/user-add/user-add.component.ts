import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {FormBuilder, FormGroup, NgForm, FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {UserValidator} from "../user.validator";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  providers: [UserService, FormBuilder],
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  title: string;
  message: string;
  submitted: boolean; // keep track on whether form is submitted
  user: FormGroup;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    console.log('UserAddComponent');
  }

  ngOnInit() {
    let object = this;

    //this.user = new User();
    this.submitted = false;

    let subscription = this.activatedRoute.params.subscribe(
        (param: any) => {
          subscription ? subscription.unsubscribe() : '';

          let userId = param['id'];
          if (userId) {
            this.userService.getById(userId)
                .subscribe(
                    (data) => {
                        object.user = new FormGroup({
                            password: new FormControl(data.password, UserValidator.required),
                            email: new FormControl(data.email, UserValidator.email)
                        });
                    });
          } else {
              object.user = new FormGroup({
                  password: new FormControl('', UserValidator.required),
                  email: new FormControl('',UserValidator.email)
              });
          }
        });
  }

  save(model:User, form: FormGroup) {
    if (form.valid) {
      this.userService.save(model);
    } else {
      this.submitted = true;
    }
  }
}
