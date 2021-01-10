import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from '../globals';

@Injectable()
export class AccountStatementService {
  constructor(private client: HttpClient) {}
  public getTopTransaction(user: string) {
    return this.client.get(
      `${GlobalVariables.BASE_API_URL}Statement?cus=${user}`
    );
  }
  public getTransactions(user: string, from: Date, to: Date) {
    return this.client.get(
      `${GlobalVariables.BASE_API_URL}Statement?cus=${user}&from=${from}+&to=${to}`
    );
  }
  public getAccountDetails(user: string) {
    return this.client.get(
      `${GlobalVariables.BASE_API_URL}Statement?user=${user}`
    );
  }
}
