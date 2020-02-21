import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  endPoint = environment.api;
  jwtHelper = new JwtHelperService();
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-auth-token' : localStorage.getItem('token') 
  });

   requestOptions:object = {
    headers: this.headers,
    responseType: 'json'
  };

  constructor(private http: HttpClient) { 
    
  }

  getTodos(): Observable<any> {
    let id = (this.jwtHelper.decodeToken(localStorage.getItem("token")))._id;
    let apiURL = this.endPoint + 'todos/' + id;
    return this.http.get(apiURL, this.requestOptions).pipe( 
    );
  }
  AddTodo(todoData): Observable<any> {
    let apiURL = this.endPoint + 'todos';
    return this.http.post(apiURL,todoData, this.requestOptions);
  }

  removeTodo(todoId): Observable<any> {
    
    let apiURL = this.endPoint + 'todos/' + todoId;
    return this.http.delete(apiURL,this.requestOptions);
  }

  todoStatusChange(id, status): Observable<any> {
    
    let apiURL = this.endPoint + 'todos/' + id;
    let body = {
      isDone : status
    }
    return this.http.put(apiURL,body,this.requestOptions);
  }
}
