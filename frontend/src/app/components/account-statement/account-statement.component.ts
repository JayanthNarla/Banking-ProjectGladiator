import { Component, OnInit } from '@angular/core';
import { AccountStatementService } from 'src/app/services/accountstatement.service';
import { Account } from 'src/app/models/account.model';
import { Statement } from 'src/app/models/statement.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {
  stateForm:FormGroup;
  statements:any=[];
  s:Statement;
  account:any;
  trans:any;
  show=false;
  empty=false;
  i=0;
  public error_messages = {
    start: [{ type: 'required', message: 'Starting date is required' }],
    end:  [{ type: 'required', message: 'Ending date is required' },{type:'Greater',message:'Ending date must be less than starting date'}],
  };
  constructor(private formBuilder:FormBuilder,private ser:AccountStatementService) { 
    this.account=new Account();
    this.ser.getAccountDetails(JSON.parse(localStorage.getItem('cust_id'))['value']).subscribe(data=>this.account=data,err=>console.log(err.error_messages));
  
    this.stateForm=this.formBuilder.group(
      {
        start:new FormControl('',Validators.required),
        end:new FormControl('',Validators.compose([Validators.required,CompareDates])),
      }
    )
  }

  ngOnInit(): void {
  }

  ontouch()
  {
    this.stateForm.get("end").markAsTouched();
  }

  Get()
  {
    this.ser.getTransactions(JSON.parse(localStorage.getItem('cust_id'))['value'],this.stateForm.get('start').value,this.stateForm.get('end').value).subscribe(data=>console.log(this.trans=data),err=>console.log(err));
  }

  SetDate()
  {
    from = this.stateForm.get('start').value;
  }

  View()
  { 
      if(this.trans.length==0)
      {
        this.show=false;
        this.empty=true;
        this.stateForm.reset();
      }
      else{
        this.empty=false;
        this.show=!this.show;
        if(this.show==true)
        {
        for(let element of this.trans){
            this.s=new Statement();
            this.i++;
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
    this.Get();
    while(this.i>=0){
      this.statements.pop(this.i);
      this.i--;
    }
    this.stateForm.reset();
  }
    console.log(this.statements);
  }
  }
}
var from;
function CompareDates(control:AbstractControl):{[key:string]:any}
{
  const to=control.value;
  if(from<=to)
  {
    return null;
  }
  else{
    return {'Greater':true};
  }
}
