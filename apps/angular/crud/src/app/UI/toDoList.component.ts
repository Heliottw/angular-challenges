import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-toDoList',
  template: `
    <div *ngFor="let todo of todos; trackBy: trackById">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [``],
  imports: [NgForOf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
  @Input() todos: Todo[] = [];
  @Output() todoUpdate = new EventEmitter<Todo>();

  update(todo: Todo) {
    this.todoUpdate.emit(todo);
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
