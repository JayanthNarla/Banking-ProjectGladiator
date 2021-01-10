export class Status{
    ref_no:string
    acc_status:string
    // cust_id:string
    // app_by:string
    // app_date:Date

    constructor(ref_no?:string,acc_status?:string){
        this.ref_no=ref_no
        this.acc_status=acc_status
        // this.cust_id=cust_id
        // this.app_by=app_by
        // this.app_date=app_date
    }
}