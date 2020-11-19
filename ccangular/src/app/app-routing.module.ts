import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SharedComponent } from './shared/shared.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
    { path: 'transactions', component: TransactionsComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: 'shared', component: SharedComponent },
    { path: '**', redirectTo: 'transactions' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}