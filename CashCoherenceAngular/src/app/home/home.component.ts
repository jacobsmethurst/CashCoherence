import {Component, OnInit} from '@angular/core';

import {Transaction} from '../_models/Transaction';
import {NotificationService} from '../_services/notification.service';
import {TransactionService} from '../_services/transaction.service';
import {first} from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  transactions: Transaction[] = [];
    constructor(
    private transactionService: TransactionService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {
      this.loadAllTransactions();
    }


  private loadAllTransactions() {
    this.transactionService.getAll().subscribe(
      transactions => this.transactions = transactions,
        error => {this.notifService.showNotif(error, 'error'); });
  }

  createTransaction() {
    this.transactionService.add().pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.notifService.showNotif(data, 'response');
              this.transactions = null;
              this.loadAllTransactions();
            },
            error => {
                console.log('Error:', error);
                this.notifService.showNotif(error);
              });
  }


  deleteTransaction(id: string) {
    this.transactionService.delete(id).pipe(first()).subscribe(() => {
      this.transactions = null;
      this.loadAllTransactions();
    });
  }
}

