import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from "../_models/Transaction";

@Component({
  selector: 'transaction-component',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() transaction: Transaction;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
