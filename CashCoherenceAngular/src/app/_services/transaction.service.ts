
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Transaction } from '../_models/Transaction';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TransactionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return new Observable(subscriber => {
            subscriber.next([
                {
                    name: 'First Transaction',
                    expense: true,
                    amount: '1650.50',
                    category: 'Rent',
                    createdDate: new Date(),
                    id: 'j2398rj2389ru23891111'
                }
            ]);
        });
        // return this.http.get<Transaction[]>(`http://localhost:4000/transaction/gettransaction`);
    }

    add() {
        const randCourse = {courseNumber: Math.floor(Math.random() * 6999 + 1000),
            latitude: 37.2296 + Math.floor(Math.random() * 2 + 0.002),
            longitude: 80.4139 + Math.floor(Math.random() * 2 + 0.002),
            courseDept: 'CS',
            courseDescription: 'Very cool CS course, more details to come.',
            // createdBy: {username: 'prof'},
            createdDate: new Date(),
            startDate: new Date('2019-08-25T09:30:00'),
            endDate: new Date('2019-12-15T09:30:00'),
            location: 'Blacksburg, VA',
            id: 'j2398rj2389ru2389' + Math.floor(Math.random() * 6999 + 1000)};

        return this.http.post(`http://localhost:4000/course/addcourse`, randCourse);
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:4000/course/${id}`);

    }
}
