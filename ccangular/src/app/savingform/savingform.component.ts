import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { SavingService } from '../_services/saving.service';
import { SavingGoalService } from '../_services/savinggoal.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-savingform',
  templateUrl: './savingform.component.html',
  styleUrls: ['./savingform.component.css']
})
export class SavingformComponent implements OnInit {

  savingForm: FormGroup;
  goalForm: FormGroup;
  addUserForm: FormGroup
  savingLoading = false;
  goalLoading = false;
  addUserLoading = false;
  savingSubmitted = false;
  goalSubmitted = false;
  addUserSubmitted = false;
  today = new Date();
  goalsList = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private savingService: SavingService,
    private savingGoalService: SavingGoalService,
    private userService: UserService
  ) { 
    userService.getById()
      .pipe(first())
      .subscribe(
        user => {
          console.log(user);
          this.goalsList = user.goals;
        },
        error => {
          console.log('Error while fetching user information: ', error);
        }
      )
  }

  ngOnInit(): void {
    this.savingForm = this.formBuilder.group({
      goal: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', [Validators.required]]
    });

    this.goalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      target: ['', [Validators.required, Validators.min(0)]],
      deadline: ['', [Validators.required]]
    });

    this.addUserForm = this.formBuilder.group({
      goal: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  get sf() {
    return this.savingForm.controls;
  }

  get gf() {
    return this.goalForm.controls;
  }

  get auf() {
    return this.addUserForm.controls;
  }

  onSavingSubmit() {
    this.savingSubmitted = true;

    if (this.savingForm.invalid) {
      return;
    }

    this.savingLoading = true;
    this.savingService.create(this.savingForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged new saving')
          this.router.navigate(['/transactions']);
        },
        error => {
          console.log('Error while creating saving: ', error);
          this.savingLoading = false;
        }
      )
  }

  onGoalSubmit() {
    this.goalSubmitted = true;

    if (this.goalForm.invalid) {
      return;
    }

    this.goalLoading = true;
    this.savingGoalService.create(this.goalForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully created new saving goal');
          this.router.navigate(['/transactions']);
        },
        error => {
          console.log('Error while creating saving goal: ', error);
          this.goalLoading = false;
        }
      )
  }

  onAddUserSubmit() {
    this.addUserSubmitted = true;

    if (this.addUserForm.invalid) {
      return;
    }

    this.addUserLoading = true;
    this.savingGoalService.addUser(this.addUserForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully added user to saving goal');
          this.router.navigate(['/transactions']);
        },
        error => {
          console.log('Error while adding user to saving goal: ', error);
          this.addUserLoading = false;
        }
      )
  }

}
