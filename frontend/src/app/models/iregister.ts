export class Iregister {
    acc_number: string;
    pwd: string;
    Tpwd:string;
    otp:number
    constructor(acc_number?: string, pwd?: string,Tpwd?:string,otp?:number) {
      this.acc_number = acc_number;
      this.pwd = pwd;
      this.Tpwd = Tpwd;
      this.otp = otp;
    }
  }