import { SavingGoal } from './savinggoal';
import { User } from './user';

export class Saving {
    date: Date;
    amount: number;
    goal: SavingGoal;
    user: User;
    _id: string;
}