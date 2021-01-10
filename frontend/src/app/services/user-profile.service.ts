import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalDetails } from '../Models/personal-details';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get('http://localhost:52759/api/Profile/' + id);
  }
  updateUserById(personal: PersonalDetails) {
    return this.http.put('http://localhost:52759/api/Profile/', personal);
  }
}
