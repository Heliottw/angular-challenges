import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './model/todo';
import { ToDoListComponent } from './UI/toDoList.component';
import { ToDoListService } from './service/toDoList.service';

@Component({
  standalone: true,
  imports: [CommonModule, ToDoListComponent],
  selector: 'app-root',
  template: `
    <app-toDoList [todos]="todos" (todoUpdate)="update($event)"></app-toDoList>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  toDoListService = inject(ToDoListService);
  todos: Todo[] = [];

  ngOnInit(): void {
    this.toDoListService.getToDo().subscribe((todo) => (this.todos = todo));
  }

  update(todo: Todo) {
    this.toDoListService.saveToDo(todo).subscribe((todoUpdated) => {
      console.log('yo');
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }
}
