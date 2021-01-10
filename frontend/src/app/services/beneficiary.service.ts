import { Add_beneficiary } from '../models/add_ben.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BeneficiaryService {
  ben: Add_beneficiary;

  constructor(private client: HttpClient) {}
  public AddBeneficiary(b: Add_beneficiary) {
    return this.client.post('http://localhost:52759/api/AddBeneficiary', b);
  }
  public GetAccountType(ben_acc_num: string) {
    return this.client.get(
      'http://localhost:52759/api/AddBeneficiary?ben_acc_num=' + ben_acc_num
    );
  }

  public getData(t: Add_beneficiary) {
    this.ben = t;
  }
  public passData() {
    return this.ben;
  }
  public getBenefiaries() {
    return this.client.get('http://localhost:52759/api/AddBeneficiary');
  }
}
