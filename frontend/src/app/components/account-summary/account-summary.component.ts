import { Component, OnInit } from '@angular/core';
import { AccountStatementService } from 'src/app/services/accountstatement.service';
import { Account } from 'src/app/models/account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { Statement } from 'src/app/models/statement.model';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  statements:any=[];
  s:Statement;
  account:any;
  trans:any;
  show=false;
  constructor(private ser:AccountStatementService) { 
    
    this.account=new Account();
    this.ser.getAccountDetails(localStorage.getItem("cust_id")).subscribe(data=>this.account=data,err=>console.log(err.error_messages));
    this.ser.getTopTransaction(localStorage.getItem("cust_id")).subscribe(data=>console.log(this.trans=data),err=>console.log("Invalid"));
  }

  ngOnInit(): void {
  }

  View()
  { 
    this.show=!this.show;
    if(this.show==true)
    {
    for(let element of this.trans){
      this.s=new Statement();
      
      this.s.date=element.tran_date.substring(0,10);
      this.s.txn_no=element.transaction_id;
      this.s.remark=element.remark;
      this.s.amt=element.transac_amt;
      this.s.mat_ins=element.mat_ins;
      if(this.account.acc_number==element.deb_acc)
      {
        this.s.dcred="Debit";
        this.s.nar="To account "+element.cred_acc+" through "+element.transaction_type;
        this.s.balance=element.deb_bal;
      }
      if(this.account.acc_number==element.cred_acc)
      {
        this.s.dcred="Credit";
        this.s.nar="From account "+element.deb_acc+" through "+element.transaction_type;
        this.s.balance=element.cred_bal;
      }
      this.statements.push(this.s);
    };
  }
  else{
    var i=[0,1,2,3,4,5,6,7,8,9];
    for(let x of i){
      this.statements.pop(x);
    }
  }
    console.log(this.statements);
  }

}
