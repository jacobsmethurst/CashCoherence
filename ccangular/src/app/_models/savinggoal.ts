import { User } from './user';

export class SavingGoal {
    name: string;
    created: Date;
    deadline: Date;
    target: number;
    balance: number;
    users: User[];
    _id: string;
}
