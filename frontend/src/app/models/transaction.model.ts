export class Transaction{
    deb_acc:string;
    cred_acc:string;
    transaction_type:string;
    transac_amt:string;
    tran_date:string;
    mat_ins:string;
    remark:string;

    constructor(from:string="",
        to:string="",
        type:string="",
        transac_amt:string="",
        trans_date:string="",
        mat_ins:string="",
        remark:string="")
    {
        this.deb_acc=to;
        this.cred_acc=from;
        this.transaction_type=type;
        this.transac_amt=transac_amt;
        this.tran_date=trans_date;
        this.mat_ins=mat_ins;
        this.remark=remark;
    }
}
