import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Transaction} from '../_models/Transaction';
import {NotificationService} from '../_services/notification.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Transaction;
  @Output() deleteEvent = new EventEmitter<string>();


  constructor(private notifService: NotificationService) { }


  ngOnInit() {
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }

}
