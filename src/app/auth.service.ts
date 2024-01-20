import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public domain = "http://localhost:8000/login/";

  constructor( private http: HttpClient ) { }

  getUserRole(token: string): Observable<string> {
    console.log(token)
    return this.http.post<string>(this.domain, token);
  }
}
