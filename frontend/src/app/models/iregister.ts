export class Iregister {
    cust_id:string;
    acc_number: string;
    pwd: string;
    Tpwd:string;
    
    constructor(acc_number?: string, pwd?: string,Tpwd?:string,cust_id?:string) {
      this.cust_id=cust_id;
      this.acc_number = acc_number;
      this.pwd = pwd;
      this.Tpwd = Tpwd;
      
    }
  }