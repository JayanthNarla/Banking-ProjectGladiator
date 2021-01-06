import { Application } from './../models/Application';
import { GlobalVariables } from './../globals';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllCustomers = () => {
    return this.http.get(
      `${GlobalVariables.BASE_API_URL}Customer/getCustomerApplications`
    );
  };

  getAllAppStatus = () => {
    return this.http.get(`${GlobalVariables.BASE_API_URL}status`);
  };

  getAllPendingAppStatus = () => {
    return this.http.get(`${GlobalVariables.BASE_API_URL}status/getPending`);
  };

  getAllApprovedAppStatus = () => {
    return this.http.get(`${GlobalVariables.BASE_API_URL}status/getApproved`);
  };

  getAllDeniedAppStatus = () => {
    return this.http.get(`${GlobalVariables.BASE_API_URL}status/getDenied`);
  };

  getAppStatus = (cust) => {
    return this.http.post(`${GlobalVariables.BASE_API_URL}status`, cust);
  };

  toggleStatus = (ref_no: number, sts: Application) => {
    return this.http.put(
      `${GlobalVariables.BASE_API_URL}status/${ref_no}`,
      sts
    );
  };
}
