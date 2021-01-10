export class PersonalDetails {
    aadhar:string;
    cust_id:string;
    title:string;
    first_name:string;
    middle_name:string;
    last_name:string;
    father_name:string;
    phone:string;
    cust_mail:string;
    res_address:string;
    perm_address:string;
    age:number;
    dob:Date;
    gender:string;
    
    constructor(aadhar:string=" ",cust_id:string=" ",title:string=" ",first_name:string=" ",middle_name:string=" ",last_name:string=" ",
    father_name:string=" ",phone:string=" ",cust_mail:string=" ",res_address:string=" ",perm_address:string=" ",age:number=0,dob:Date=null,
    gender:string=" ")
    {
        this.aadhar=aadhar;
        this.cust_id=cust_id;
        this.title=title;
        this.first_name=first_name;
        this.middle_name=middle_name;
        this.last_name=last_name;
        this.father_name=father_name;
        this.phone=phone;
        this.cust_mail=cust_mail;
        this.res_address=res_address;
        this.perm_address=perm_address;
        this.age=age;
        this.dob=dob;
        this.gender=gender;
    }




}
