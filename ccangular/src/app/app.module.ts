import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { SavingComponent } from './saving/saving.component';
import { SavinggoalComponent } from './savinggoal/savinggoal.component';
import { IncomeformComponent } from './incomeform/incomeform.component';
import { GoalsComponent } from './goals/goals.component';
import { ExpenseformComponent } from './expenseform/expenseform.component';
import { SavingformComponent } from './savingform/savingform.component';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    GraphsComponent,
    LoginComponent,
    RegisterComponent,
    IncomeComponent,
    ExpenseComponent,
    SavingComponent,
    SavinggoalComponent,
    IncomeformComponent,
    ExpenseformComponent,
    SavingformComponent,
    GoalsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
