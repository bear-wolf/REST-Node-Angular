import { Component, OnInit } from '@angular/core';
import {User, statusOfUser} from "../../../model/user";
import {FormBuilder, FormGroup, NgForm, FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {UserValidator} from "../user.validator";

@Component({
  selector: 'user-add',
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
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let object = this;

    //this.user = new User();
    this.submitted = false;

    object.user = new FormGroup({
          id: new FormControl(''),
          password: new FormControl('', UserValidator.required),
          email: new FormControl('', UserValidator.email),
          dataCreate: new FormControl(''),
          status: new FormControl(statusOfUser.user)
      });

    let subscription = this.activatedRoute.params.subscribe(
        (param: any) => {
          subscription ? subscription.unsubscribe() : '';

          let userId = param['id'];
          if (userId) {
            this.userService.getById(userId)
                .subscribe(
                (data) => {
                    if (data.status) {
                        data = data['body'];
                        (<FormControl>this.user.controls['id']).setValue(data.id);
                        (<FormControl>this.user.controls['password']).setValue(data.password);
                        (<FormControl>this.user.controls['email']).setValue(data.email);
                        (<FormControl>this.user.controls['dataCreate']).setValue(data.dataCreate);
                        (<FormControl>this.user.controls['status']).setValue(data.status);
                }});
          }
        });
  }

  save(model, validation:boolean) {
      let object = this,
          data:User = model.value,
          currentTime = (new Date()).getTime();

    if (validation) {
        (data.id) ? data.dataUpdate = currentTime : data.dataCreate = currentTime;

      this.userService.save(data)
          .subscribe((data)=>{
              if (data.status) {
                  object.router.navigate(['/users'], {
                      queryParams:{
                          reload: true
                        }
                  });
              }
          },
          error=>{
              object.message = JSON.parse(error['_body']).message;
          });
    } else {
      this.submitted = true;
    }
  }
}
