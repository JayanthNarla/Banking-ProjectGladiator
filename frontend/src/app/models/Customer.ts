export class Customer {
  cust_name: string;
  aadhar: string;
  cust_id: string;
  father_name: string;
  phone: string;
  cust_mail: string;
  dob: string;
  age: string;
  res_address: string;
  gender: string;
  acc_status: string;
  ref_no: string;
  app_by: string;
  app_date: string;
  constructor(
    cust_name?: string,
    aadhar?: string,
    cust_id?: string,
    father_name?: string,
    phone?: string,
    cust_mail?: string,
    dob?: string,
    age?: string,
    res_address?: string,
    gender?: string,
    acc_status?: string,
    ref_no?: string,
    app_by?: string,
    app_date?: string
  ) {
    this.cust_name = cust_name;
    this.aadhar = aadhar;
    this.cust_id = cust_id;
    this.father_name = father_name;
    this.phone = phone;
    this.cust_mail = cust_mail;
    this.dob = dob;
    this.age = age;
    this.res_address = res_address;
    this.gender = gender;
    this.acc_status = acc_status;
    this.ref_no = ref_no;
    this.app_by = app_by;
    this.app_date = app_date;
  }
}
