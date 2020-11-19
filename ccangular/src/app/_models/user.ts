import { Income } from './income';
import { Expense } from './expense';
import { Saving } from './saving';
import { SavingGoal } from './savinggoal';

export class User {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    token?: string;
    incomes: Income[];
    expenses: Expense[];
    savings: Saving[];
    goals: SavingGoal[];
    _id: string;
}