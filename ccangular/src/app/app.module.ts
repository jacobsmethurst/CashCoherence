import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SharedComponent } from './shared/shared.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { SavingComponent } from './saving/saving.component';
import { SavinggoalComponent } from './savinggoal/savinggoal.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    GraphsComponent,
    SharedComponent,
    LoginComponent,
    RegisterComponent,
    IncomeComponent,
    ExpenseComponent,
    SavingComponent,
    SavinggoalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
