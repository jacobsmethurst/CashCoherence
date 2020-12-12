import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goals = [];
  data = [];
  pieData;
  selectGoalFormControl = new FormControl();

  totalSaved;
  totalRemaining;
  deadline;

  constructor(
    private userService: UserService
  ) { 
    userService.getById()
      .pipe(first())
      .subscribe(
        currUser => {
          this.goals = currUser.goals;
          this.goals.forEach(goal => {
            goal.users.forEach(user => {
              user.savings = user.savings.filter(saving => saving.goal === goal.id);
              user.totalSavings = 0;
              user.savings.forEach(matchingSaving => user.totalSavings += matchingSaving.amount);
            });

            let usernames = [];
            let userContributions = [];
            let userColors = [];
            let totalContributions = 0;
            goal.users.forEach(user => {
              usernames.push(user.username);
              userContributions.push(user.totalSavings);
              totalContributions += user.totalSavings;
              userColors.push('rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')');
            });
            let remaining = goal.target - totalContributions;
            if (remaining > 0) {
              usernames.push('REMAINING');
              userContributions.push(remaining);
              userColors.push('rgb(0, 0, 0,)');
            }
          
            this.data.push({
              labels: usernames,
              datasets: [
                {
                  data: userContributions,
                  backgroundColor: userColors
                }
              ]
            });
          });

          // console.log(this.data);
        },
        error => {
          console.log('Error while getting user info: ', error);
        }
      )
  }

  ngOnInit(): void {
  }

  updateData() {
    let currGoal = this.goals.find(goal => goal.id === this.selectGoalFormControl.value)
    this.pieData = this.data[this.goals.indexOf(currGoal)];
    // console.log(this.pieData); 
    // console.log(currGoal);

    this.totalSaved = currGoal.balance;
    this.totalRemaining = currGoal.target - currGoal.balance;
    this.deadline = new Date(currGoal.deadline).toDateString();
  }

}
