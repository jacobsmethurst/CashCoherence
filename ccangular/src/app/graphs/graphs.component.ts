import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  endDate;
  startDate;
  allIncomes = [];
  allExpenses = [];
  allSavings = [];
  inRangeIncomes = [];
  inRangeExpenses = [];
  inRangeSavings = [];
  pieData: any;
  startDateFormControl;
  endDateFormControl; 

  constructor(
    private userService: UserService
  ) { 
    this.endDate = new Date();
    this.startDate = new Date()
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.startDateFormControl = new FormControl(this.startDate);
    this.endDateFormControl = new FormControl(this.endDate);

    userService.getById()
      .pipe(first())
      .subscribe(
        user => {
          // console.log(user)
          const incomes = user.incomes;
          const expenses = user.expenses;
          const savings = user.savings;
      
          for (let income of incomes) {
            this.allIncomes.push({
              id: income._id,
              name: income.name,
              date: new Date(income.date),
              amount: income.amount,
              type: 'income',
              category: 'Income'
            });
          }
      
          for (let saving of savings) {
            this.allSavings.push({
              id: saving._id,
              name: saving.goal.name,
              date: new Date(saving.date),
              amount: saving.amount,
              type: 'saving',
              category: 'Saving'
            });
          }
      
          for (let expense of expenses) {
            this.allExpenses.push({
              id: expense._id,
              name: expense.name,
              date: new Date(expense.date),
              amount: expense.amount,
              type: 'expense',
              category: expense.category
            });
          }

          this.setPieData();
        },
        error => {
          console.log('Error while getting user information: ', error);
        }
      );
  }

  ngOnInit(): void {
  }

  setPieData() {
    this.inRangeIncomes = this.allIncomes.filter(income => income.date >= this.startDate && income.date <= this.endDate);
    this.inRangeSavings = this.allSavings.filter(saving => saving.date >= this.startDate && saving.date <= this.endDate);
    this.inRangeExpenses = this.allExpenses.filter(expense => expense.date >= this.startDate && expense.date <= this.endDate);

    let labelSet = new Set();
    let totalsMap = new Map(); 
    
    this.inRangeExpenses.forEach(expense => labelSet.add(expense.category));
    let labels = Array.from(labelSet);
    labels.forEach(label => totalsMap.set(label, 0));
    this.inRangeExpenses.forEach(expense => totalsMap.set(expense.category, totalsMap.get(expense.category) + expense.amount));
    let colorsMap = new Map();
    labels.forEach(label => colorsMap.set(label, 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')'));
    colorsMap.set('Savings', 'rgb(0, 15, 43)');

    let savingSum;
    if (this.inRangeSavings.length > 0) {
      savingSum = this.inRangeSavings.reduce((a, b) => a.amount + b.amount);
    } else {
      savingSum = 0;
    }
    totalsMap.set('Savings', savingSum);

    this.pieData = {
      labels: Array.from(totalsMap.keys()),
      datasets: [
        {
          data: Array.from(totalsMap.values()),
          backgroundColor: Array.from(colorsMap.values())
        }
      ]
    };
    // console.log(this.pieData);
  }

  updateStart() {
    this.startDate = new Date(this.startDateFormControl.value);
    this.setPieData();
  }

  updateEnd() {
    this.endDate = new Date(this.endDateFormControl.value);
    this.setPieData();
  }

}
