import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Income } from '../_models/income';

@Injectable({ providedIn: 'root' })
export class IncomeService {
    constructor(private http: HttpClient) {}

    create(income: Income) {
        return this.http.post(`http://localhost:4000/income/create`, income);
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:4000/income/${id}`);
    }
}