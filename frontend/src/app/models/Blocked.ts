export class Blocked {
  cust_id: string;
  acc_number: string;
  constructor(cust_id?: string, acc_number?: string) {
    this.cust_id = cust_id;
    this.acc_number = acc_number;
  }
}
