import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../Models/personal-details';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsService {
  constructor(private http: HttpClient) {}

  postDetails(PersonalDetails: PersonalDetails) {
    // console.log(PersonalDetails);

    return this.http.post(
      'http://localhost:52759/api/CustStatus',
      PersonalDetails
    );
  }

  forgotUID = (pDets: any) => {
    return this.http.post(
      'http://localhost:52759/api/CustStatus/forgotUid',
      pDets
    );
  };

  getDetails(id: string) {
    return this.http.get('http://localhost:52759/api/CustStatus/' + id);
  }
}
