export class Transaction{
    from:string;
    to:string;
    transac_amt:string;
    tran_date:string;
    mat_ins:string;
    remark:string;

    constructor(from:string="",
        to:string="",
        transac_amt:string="",
        trans_date:string="",
        mat_ins:string="",
        remark:string="")
    {
        this.to=to;
        this.from=from;
        this.transac_amt=transac_amt;
        this.tran_date=trans_date;
        this.mat_ins=mat_ins;
        this.remark=remark;
    }
}
