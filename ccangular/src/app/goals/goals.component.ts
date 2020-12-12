import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goal;
  savings;

  constructor(
    private userService: UserService
  ) { 
    userService.getById()
      .pipe(first())
      .subscribe(
        user => {
          this.goal = user.goals[0];
          this.savings = user.savings;
          console.log(this.goal);
          console.log(this.savings);
        },
        error => {
          console.log('Error while getting user info: ', error);
        }
      )
  }

  ngOnInit(): void {
  }

}
