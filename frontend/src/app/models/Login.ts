export class Login {
  cust_id: string;
  pwd: string;
  constructor(cust_id?: string, pwd?: string) {
    this.cust_id = cust_id;
    this.pwd = pwd;
  }
}
