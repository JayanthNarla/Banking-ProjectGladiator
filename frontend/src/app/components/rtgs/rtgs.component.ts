import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  trans:Transaction;
  currentDate=new Date();
  public transForm:FormGroup;
  public error_messages = {
    deb_acc: [
      { type: 'required', message: 'From account is required' },
      { type: 'maxlength', message: 'From account number must be of length 15' },
      { type: 'minlength', message: 'From account number must be of length 15' },
      {type:'Invalid',message:'Invalid Account'},
      ],
    cred_acc: [
      { type: 'required', message: 'To account is required' },
      { type: 'maxlength', message: 'To account number must be of length 15' },
      { type: 'minlength', message: 'To account number must be of length 15' },
      { type:'SameAccount',message:'Both from and to account are same'}],
    trans_amt: [
      { type: 'required', message: 'Transaction amount is required' },
      {type:'max',message:'Transaction amount cannot exceed Rs.25,000'},
      {type:'min',message:'Transaction amount must be greater than Rs.100'}],
    mat_ins: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }],
    remark: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }]
  };

  constructor(private formBuilder:FormBuilder,private ser:TransactionService) {
    this.trans=new Transaction();
    this.trans.transaction_type="rtgs";
    this.transForm = this.formBuilder.group({
      deb_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15)])),
      cred_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15),Accounts])),
      trans_amt:new FormControl('',Validators.compose([Validators.required,Validators.max(25000),Validators.min(100)])),
      mat_ins:new FormControl('',Validators.maxLength(50)),
      remark:new FormControl('',Validators.maxLength(50)),
    });
  }

  ngOnInit(): void {
  }

  onReset()
  {
    this.transForm.reset();
  }
  onSubmit(){    
    if(this.transForm.valid){
      this.trans.deb_acc=this.transForm.get('deb_acc').value;
      this.trans.cred_acc=this.transForm.get('cred_acc').value;
      this.trans.tran_date=this.currentDate.toLocaleString();
      this.trans.transac_amt=this.transForm.get('trans_amt').value;
      this.trans.remark=this.transForm.get('remark').value;
      this.trans.mat_ins=this.transForm.get("mat_ins").value;
      this.ser.getData(this.trans);
      this.transForm.reset()
    }
  }
  validateDeb()
  {
    dc=this.transForm.get("deb_acc").value;
    this.ser.GetPassword(dc).subscribe(
      d=>present=d.toString(),
      err=>{alert("Invalid Account number");this.transForm.get("deb_acc").setValue("")});
  }
  validateAcc()
  {
    var acc=this.transForm.get("cred_acc").value;
    console.log(acc);
    this.ser.GetPassword(acc).subscribe(
      d=>present=d.toString(),
      err=>{alert("Invalid Account number");this.transForm.get("cred_acc").setValue("")});
  }
}
var dc;
var present:string="";
function Accounts(control:AbstractControl):{[key:string]:any}
{
  const ca=control.value;
  if(dc!=ca)
  {
    return null;
  }
  else{
    return {'SameAccount':true};
  }
}
