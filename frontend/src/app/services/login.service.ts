import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly rootURL = 'http://localhost:52759/api/';
  constructor(private http: HttpClient) {}

  userLogin = (user: Login) => {
    return this.http.post(`${this.rootURL}Login`, user);
  };
}
