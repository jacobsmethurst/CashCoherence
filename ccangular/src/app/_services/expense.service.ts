import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Expense } from '../_models/expense';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    constructor(private http: HttpClient) {}

    create(expense: Expense) {
        return this.http.post(`http://localhost:4000/expense/create`, expense);
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:4000/expense/${id}`);
    }
}