import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    customClass="bg-light-red"
    [items]="teachers"
    (addEvent)="handleAdd($event)">
    <img image src="assets/img/teacher.png" width="200px" />
    <ng-template #list>
      <app-list-item
        *ngFor="let teacher of teachers"
        [name]="teacher.firstname"
        [id]="teacher.id"
        (deleteEvent)="handleDelete($event)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  handleDelete(id: number) {
    this.store.deleteOne(id);
  }

  handleAdd(_: boolean) {}
}
