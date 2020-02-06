import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  endPoint = environment.api;
  
  constructor(private http: HttpClient) { 
  }
  
  getTodos(): Observable<any> {
    
    let apiURL = this.endPoint + 'todos';
    return this.http.get(apiURL);
  }
  AddTodo(todoData): Observable<any> {
    
    let apiURL = this.endPoint + 'todos';
   // const body = JSON.stringify(todoData);
    return this.http.post(apiURL,todoData);
  }

  removeTodo(todoId): Observable<any> {
    
    let apiURL = this.endPoint + 'todos/' + todoId;
    return this.http.delete(apiURL);
  }

  todoStatusChange(id, status): Observable<any> {
    
    let apiURL = this.endPoint + 'todos/' + id;
    let body = {
      isDone : status
    }
    return this.http.put(apiURL,body);
  }
}
