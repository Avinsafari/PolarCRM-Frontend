import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public domain = "http://localhost:8000/login/";

  constructor( private http: HttpClient ) { }

  authenticateUser(token: (string|null)): Observable<any> {
    if(token !== null) {
      return this.http.post<string>(
        this.domain,
        { "token": token },
        { headers: {'Content-Type': 'application/json'} }
      );
    } else { return of(false); }
  }

  reauthenticateUser(role: string): boolean {
    const token = localStorage.getItem('token');
    if(token !== null) {
      const savedRole = localStorage.getItem('role');
      switch(role) {
        case 'admin':
          if(savedRole !== null && savedRole === 'admin') return true;
          else return false;
        case 'national':
          if(savedRole !== null && savedRole === 'admin' || savedRole === 'national') return true;
          else return false;
        case 'local':
          if(savedRole !== null && savedRole === 'admin' || savedRole === 'national' || savedRole === 'local') return true;
          else return false;
        default:
          return false;
      }
    } else {
      return false;
    }
  }
}
