import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseformComponent } from './expenseform/expenseform.component';
import { SavingformComponent } from './savingform/savingform.component';
import { GraphsComponent } from './graphs/graphs.component';
import { IncomeformComponent } from './incomeform/incomeform.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { GoalsComponent } from './goals/goals.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
    { path: 'graphs', component: GraphsComponent, canActivate: [AuthGuard] },
    { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    { path: 'incomeform', component: IncomeformComponent, canActivate: [AuthGuard] },
    { path: 'expenseform', component: ExpenseformComponent, canActivate: [AuthGuard] },
    { path: 'savingform', component: SavingformComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'transactions' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}