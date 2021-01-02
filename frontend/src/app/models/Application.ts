export class Application {
  ref_no: string;
  cust_id: string;
  app_by: string;
  acc_status: string;
  app_date: string;
  constructor(
    ref_no?: string,
    cust_id?: string,
    app_by?: string,
    acc_status?: string,
    app_date?: string
  ) {
    this.ref_no = ref_no;
    this.cust_id = cust_id;
    this.app_by = app_by;
    this.acc_status = acc_status;
    this.app_date = app_date;
  }
}
