import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { IncomeService } from '../_services/income.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-incomeform',
  templateUrl: './incomeform.component.html',
  styleUrls: ['./incomeform.component.css']
})
export class IncomeformComponent implements OnInit {

  incomeForm: FormGroup;
  loading = false;
  submitted = false;
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    this.incomeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', [Validators.required]]
      
    });
  }

  get f() {
    return this.incomeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.incomeForm.invalid) {
      return;
    }

    this.loading = true;
    this.incomeService.create(this.incomeForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully created new income')
          this.router.navigate(['/transactions']);
        },
        error => {
          console.log('Error while creating income: ', error);
          this.loading = false;
        }
      )
  }

}
