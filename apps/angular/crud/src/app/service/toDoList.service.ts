import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  url = 'https://jsonplaceholder.typicode.com/todos';
  http = inject(HttpClient);

  getToDo() {
    return this.http.get<Todo[]>(this.url);
  }

  saveToDo({ id, body, userId }: Todo) {
    const todoReadyToSave = {
      todo: id,
      title: randText(),
      body: body,
      userId: userId,
    };

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json; charset=UTF-8');

    return this.http.put<Todo>(`${this.url}/${id}`, todoReadyToSave, {
      headers,
    });
  }
}
