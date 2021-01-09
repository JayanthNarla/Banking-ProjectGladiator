import { Blocked } from './../models/Blocked';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { GlobalVariables } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  userLogin = (user: Login) => {
    return this.http.post(`${GlobalVariables.BASE_API_URL}Login`, user);
  };

  updatePassword = (user: Login) => {
    return this.http.put(
      `${GlobalVariables.BASE_API_URL}Login/${user.cust_id}`,
      user
    );
  };

  setBlockedUser = (blocked: Blocked) => {
    return this.http.post(
      `${GlobalVariables.BASE_API_URL}Login/setBlocked`,
      blocked
    );
  };
}
