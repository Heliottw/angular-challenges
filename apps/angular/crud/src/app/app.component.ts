import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Todo } from './model/todo';
import { ToDoListComponent } from './UI/toDoList.component';
import { ToDoListService } from './service/toDoList.service';
import { BehaviorSubject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, ToDoListComponent],
  selector: 'app-root',
  template: `
    <app-toDoList
      [todos]="todos()"
      (todoUpdate)="update($event)"></app-toDoList>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  toDoListService = inject(ToDoListService);

  todos = signal<Todo[]>([]);

  ngOnInit() {
    this.toDoListService.getToDo().subscribe((todos) => this.todos.set(todos));
  }

  update(todo: Todo) {
    this.toDoListService.saveToDo(todo).subscribe((todoUpdated) => {
      const todos = this.todos();
      this.todos().splice(todoUpdated.id - 1, 1, todoUpdated);

      this.todos.set(todos);
    });
  }
}
