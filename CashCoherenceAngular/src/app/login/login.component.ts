import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// TODO: make this 'Reactive Form' based. Need to be able to hit enter to login.

@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    username: string;
    password: string;

  constructor(
     private router: Router,
     private authService: AuthService,
     private notif: NotificationService,
     private formBuilder: FormBuilder
  ) {
     if (this.authService.currentUserValue) {
         this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
         username: ['', [Validators.required]],
         password: ['', [Validators.required]]
      });
  }

  get f() {
      return this.loginForm.controls;
  }

    login() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            console.log('Error in login()');
            return;
        }

        this.loading = true;
        this.authService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
        user => {
                this.router.navigate(['']);
                this.notif.showNotif(user.username + ' has logged in!', 'confirmation');
            },
        error => {
            this.error = error;
            this.loading = false;
            // show a snackbar to user
            this.notif.showNotif(this.error, 'dismiss');
            console.log('Error', error);
        });
    }
}


