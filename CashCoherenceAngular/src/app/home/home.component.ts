import {Component, OnInit} from '@angular/core';

import {Course} from '../_models/course';
import {NotificationService} from '../_services/notification.service';
import {CourseService} from '../_services/course.service';
import {first} from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  courses: Course[] = [];
    constructor(
    private courseService: CourseService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadAllClasses();
      }


  private loadAllClasses() {
    console.log('loadAllClase()');
    this.courseService.getAll().subscribe(
      courses => {this.courses = courses; },
        error => {this.notifService.showNotif(error, 'error'); });
  }

  createCourse() {
    this.courseService.add().pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.notifService.showNotif(data, 'response');
              this.courses = null;
              this.loadAllClasses();
            },
            error => {
              console.log('Error:', error);
              this.notifService.showNotif(error);
              });
  }


  deleteCourse(id: string) {
    this.courseService.delete(id).pipe(first()).subscribe(() => {
      this.courses = null;
      this.loadAllClasses();
    });
  }
}

