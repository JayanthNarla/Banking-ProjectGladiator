import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregister } from '../Models/iregister';

@Injectable({
  providedIn: 'root',
})
export class RegisterPageService {
  constructor(private http: HttpClient) {}

  postInternetDetails(iregister: Iregister) {
    return this.http.post('http://localhost:52759/api/PostTest', iregister);
  }
}
