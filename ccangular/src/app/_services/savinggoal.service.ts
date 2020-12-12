import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SavingGoal } from "../_models/savinggoal";

@Injectable({ providedIn: 'root' })
export class SavingGoalService {
    constructor(private http: HttpClient) {}

    create(savinggoal: SavingGoal) {
        return this.http.post(`http://localhost:4000/savinggoal/create`, savinggoal);
    }

    addUser(addUserForm: any) {
        return this.http.post(`http://localhost:4000/savinggoal/adduser`, addUserForm);
    }
}