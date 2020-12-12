import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Saving } from '../_models/saving';

@Injectable({ providedIn: 'root' })
export class SavingService {
    constructor(private http: HttpClient) {}

    create(saving: Saving) {
        console.log(saving);
        return this.http.post(`http://localhost:4000/saving/create`, saving);
    }
}