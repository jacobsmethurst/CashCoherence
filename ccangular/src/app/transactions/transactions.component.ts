import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements AfterViewInit {

  data = [];
  dataSource;
  displayedColumns: string[] = ['date', 'name', 'amount', 'category', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService
  ) {

    userService.getById()
      .pipe(first())
      .subscribe(
        user => {
          console.log(user)
          const incomes = user.incomes;
          const expenses = user.expenses;
          const savings = user.savings;
      
          for (let income of incomes) {
            this.data.push({
              name: income.name,
              date: new Date(income.date).toDateString(),
              amount: income.amount,
              type: 'income',
              category: 'Income'
            });
          }
      
          for (let saving of savings) {
            this.data.push({
              name: saving.goal.name,
              date: new Date(saving.date).toDateString(),
              amount: saving.amount,
              type: 'saving',
              category: 'Saving'
            });
          }
      
          for (let expense of expenses) {
            this.data.push({
              name: expense.name,
              date: new Date(expense.date).toDateString(),
              amount: expense.amount,
              type: 'expense',
              category: expense.category
            });
          }
          this.dataSource = new MatTableDataSource(this.data); 
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log('Error while logging in: ', error);
        }
      )   
  }

  ngAfterViewInit(): void {
  }

}
