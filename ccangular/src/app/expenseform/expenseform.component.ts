import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ExpenseService } from '../_services/expense.service';

@Component({
  selector: 'app-expenseform',
  templateUrl: './expenseform.component.html',
  styleUrls: ['./expenseform.component.css']
})
export class ExpenseformComponent implements OnInit {

  expenseForm: FormGroup;
  loading = false;
  submitted = false;
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  get f() {
    return this.expenseForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.expenseForm.invalid) {
      return;
    }

    this.loading = true;
    this.expenseService.create(this.expenseForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully created new expense')
          this.router.navigate(['/transactions']);
        },
        error => {
          console.log('Error while creating expense: ', error);
          this.loading = false;
        }
      )
  }

}
