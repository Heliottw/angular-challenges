import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './model/todo';
import { ToDoListComponent } from './UI/toDoList.component';
import { ToDoListService } from './service/toDoList.service';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ToDoListComponent],
  selector: 'app-root',
  template: `
    <app-toDoList
      [todos]="(todos$ | async) || []"
      (todoUpdate)="update($event)"></app-toDoList>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  toDoListService = inject(ToDoListService);
  todos$ = new BehaviorSubject<Todo[]>([]);

  ngOnInit(): void {
    this.toDoListService
      .getToDo()
      .pipe(tap((todos) => this.todos$.next(todos)))
      .subscribe();
  }

  update(todo: Todo) {
    this.toDoListService.saveToDo(todo).subscribe((todoUpdated) => {
      const todos = this.todos$.value;
      todos[todoUpdated.id - 1] = todoUpdated;

      this.todos$.next(todos);
    });
  }
}
