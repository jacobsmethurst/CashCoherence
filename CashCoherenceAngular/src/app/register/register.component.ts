import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'register.component.html',

  styleUrls: ['register.component.css']

})

// TODO: add the necessary fields so that users can be registered in accordance with user.model.js from NodeJS.

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthService,
      private userService: UserService,
      private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    // TODO: be sure to validate the new fields.
    this.registerForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
    });

    this.roles = [{name: 'Student'},
      {name: 'Professor'}];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
            },
            error => {
              console.log('Error:', error);
              this.notification.showNotif(error);
              this.loading = false;
            });
  }
}
