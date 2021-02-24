import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date?: any;
}

@Injectable({providedIn: 'root'})
export class TodosService {

  constructor(private http: HttpClient) {}

  public todos: Todo[] = [];

  public fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .pipe(tap(todos => this.todos = todos));
  }

  public onToggle(id: number): void {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
  }

  public removeTodo(id: number): void {
    this.todos = this.todos.filter(it => it.id !== id);
    console.log('Todo removed');
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo);
    console.log('new Todo added.');
  }
}
