import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements AfterViewInit {

  testData = [
    {
      name: 'test',
      date: new Date().toDateString(),
      amount: 50.2,
      type: 'income',
      category: ''
    },
    {
      name: 'test2',
      date: new Date().toDateString(),
      amount: 55.0,
      type: 'expense',
      category: 'newcat'
    },
    {
      name: 'savingtest',
      date: new Date().toDateString(),
      amount: 200.23,
      type: 'saving',
      category: ''
    }
  ];

  displayedColumns: string[] = ['date', 'name', 'amount', 'category', 'actions'];
  dataSource = new MatTableDataSource(this.testData);

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getCategory(transaction): string {
    if (transaction.category) {
      return transaction.category;
    }

    if (transaction.type === 'income') {
      return 'Income';
    }

    return 'Saving';
  }

}
