import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { NgForOf } from '@angular/common';
import { Subject, Teacher } from '../../model/teacher.model';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [items]="students"
    (addEvent)="handleAdd($event)"
    customClass="bg-light-green">
    <img image src="assets/img/student.webp" width="200px" />
    <ng-template #list>
      <app-list-item
        *ngFor="let student of students"
        [name]="student.firstname"
        [id]="student.id"
        (deleteEvent)="handleDelete($event)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  id = 0;
  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  handleDelete(id: number) {
    this.store.deleteOne(id);
  }

  handleAdd(_: boolean) {
    this.store.addOne({
      id: this.id++,
      firstname: 'axel',
      lastname: 'duvacher',
      mainTeacher: {
        id: 1,
        firstname: 'ax',
        lastname: 'duv',
        subject: 'Sciences',
      },
      school: 'les fleurettes',
    });
  }
}
