export class Account {
  cust_id: string;
  acc_number: string;
  acc_type: string;
  balance: string;
  Name: string;

  constructor(
    cust_id?: string,
    acc_number?: string,
    acc_type?: string,
    balance?: string,
    Name?: string
  ) {
    this.cust_id = cust_id;
    this.acc_number = acc_number;
    this.acc_type = acc_type;
    this.balance = balance;
    this.Name = Name;
  }
}
