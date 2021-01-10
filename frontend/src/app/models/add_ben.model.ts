export class Add_beneficiary{
    ben_name:string;
    ben_acc_num:string;
    Re_enterAccount_num:string;
    nickname:string;
    cust_id:string;
    


    constructor(ben_acc_num:string="",
        ben_name:string="",
        nickname:string="",
        cust_id:string="",
        
        )
    {
        this.ben_acc_num=ben_acc_num;
        this.ben_name=ben_name;
        this.Re_enterAccount_num=ben_acc_num;
        this.nickname = nickname;
        this.cust_id=cust_id;
        
        
    }
}