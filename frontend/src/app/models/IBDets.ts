export class IBDets {
  user_id: string;
  acc_number: string;
  pwd: string;
  tpwd: string;
  constructor(
    user_id?: string,
    acc_number?: string,
    pwd?: string,
    tpwd?: string
  ) {
    this.user_id = user_id;
    this.acc_number = acc_number;
    this.pwd = pwd;
    this.tpwd = tpwd;
  }
}
