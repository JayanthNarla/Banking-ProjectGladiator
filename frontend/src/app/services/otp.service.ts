import { IBDets } from './../models/IBDets';
import { PersonalDetails } from 'src/app/Models/personal-details';
import { Customer } from './../models/Customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from '../globals';
import { Otp } from '../models/Otp';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  generateOTP = (otp: Otp) => {
    console.log(otp);

    return this.http.post(`${GlobalVariables.BASE_API_URL}getOTP/genOtp`, otp);
  };
  sendIBDets = (ibdets: IBDets) => {
    return this.http.post(
      `${GlobalVariables.BASE_API_URL}GetOTP/sendIBDets`,
      ibdets
    );
  };
  verifyMail = (cust: Customer) => {
    // console.log(cust);

    return this.http.post(
      `${GlobalVariables.BASE_API_URL}GetOTP/verifyMail`,
      cust
    );
  };
  verifyMailByAccNum = (pDetails: Account) => {
    // console.log(pDetails);

    return this.http.post(
      `${GlobalVariables.BASE_API_URL}GetOTP/verifyMailByAccNum`,
      pDetails
    );
  };
}
