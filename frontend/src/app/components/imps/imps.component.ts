import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountStatementService } from 'src/app/services/accountstatement.service';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';


@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {
  all:any;
  list:any=[];

  useracc:any;
  
  trans:Transaction;
  currentDate=new Date();
  
  public transForm:FormGroup;
  
  public error_messages = {
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

  constructor(private ben:BeneficiaryService, private formBuilder:FormBuilder,private ser:TransactionService,private toastr:ToastrService,private acc:AccountStatementService) {
    
    this.ben.getBenefiaries().subscribe(d=>{this.all=d;this.Split()});
    
    this.acc.getAccountDetails(JSON.parse(localStorage.getItem('cust_id'))['value']).subscribe(d=>this.useracc=d);
    
    this.trans=new Transaction();
    this.trans.transaction_type="imps";
    
    this.transForm = this.formBuilder.group({
      ben:new FormControl(''),
      cred_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15)])),
      trans_amt:new FormControl('',Validators.compose([Validators.required,Validators.max(25000),Validators.min(100)])),
      mat_ins:new FormControl('',Validators.maxLength(50)),
      remark:new FormControl('',Validators.maxLength(50)),
    });

  }

  selectBen()
  {
    this.transForm.get("cred_acc").setValue(this.transForm.get("ben").value.ben_acc_num);
  }

  ngOnInit(): void {
    
  }

  Split()
  {
    for(let x of this.all)
    {
      if(x.cust_id==JSON.parse(localStorage.getItem('cust_id'))['value'])
      {
        this.list.push(x);
      }
    }
  }

  onReset()
  {
    window.location.reload();
  }
  onSubmit(){    
    if(this.transForm.valid){
      this.trans.deb_acc=this.useracc.acc_number;
      this.trans.cred_acc=this.transForm.get('cred_acc').value;
      this.trans.tran_date=this.currentDate.toLocaleString();
      this.trans.transac_amt=this.transForm.get('trans_amt').value;
      this.trans.remark=this.transForm.get('remark').value;
      this.trans.mat_ins=this.transForm.get("mat_ins").value;
      this.ser.getData(this.trans);
      this.transForm.reset()
    }
  }
  validateAcc()
  {
    var present="";
    var acc=this.transForm.get("cred_acc").value;
    console.log(acc);
    this.ser.GetPassword(acc).subscribe(
      d=>present=d.toString(),
      err=>{this.toastr.error("Invalid Account number");this.transForm.get("cred_acc").setValue("")});
    if(present!=null && this.transForm.get("cred_acc").value==this.useracc.acc_number)
    {
      this.toastr.info("You cannot pay yourself");
      this.transForm.get("cred_acc").setValue("");
    }
  }
}


