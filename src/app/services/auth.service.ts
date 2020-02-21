import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }
  
  endPoint = environment.api;
  
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
   });

   requestOptions:object = {
    headers: this.headers,
    responseType: 'json'
  };

  public isAuthenticated(): Boolean{
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    console.log('tokenExp ', jwtHelper.isTokenExpired(token))
    return !jwtHelper.isTokenExpired(token);
  }
  register(credentials): Observable<any> {
    let apiURL = this.endPoint + 'users';
    return this.http.post(apiURL, credentials, this.requestOptions).pipe();
  }

  login(credentials): Observable<any> {
    let apiURL = this.endPoint + 'auth';
    return this.http.post(apiURL, credentials, this.requestOptions).pipe();
  }
}
