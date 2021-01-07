import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {
  trans:Transaction;
  submitted=false;
  public transForm:FormGroup;
  public error_messages = {
    deb_acc: [{ type: 'required', message: 'From account is required' },{ type: 'maxlength', message: 'From account number must be 15 alphabets' },{ type: 'minlength', message: 'From account number must be 15 alphabets' }],
    cred_acc: [{ type: 'required', message: 'To account is required' },{ type: 'maxlength', message: 'To account number must 15 alphabets' },{ type: 'minlength', message: 'To account number must 15 alphabets' }],
    trans_amt: [{ type: 'required', message: 'Transaction amount is required' }],
    tran_date: [{ type: 'required', message: 'Transaction date is required' }],
    mat_ins: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }],
    remark: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }]
  };

  constructor(private formBuilder:FormBuilder,private ser:TransactionService) {
    this.trans=new Transaction();
    this.trans.transaction_type="imps";
    this.transForm = this.formBuilder.group({
      deb_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15)])),
      cred_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15)])),
      trans_amt:new FormControl('',Validators.required),
      tran_date:new FormControl('',Validators.required),
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
    this.submitted=true
    console.log("button clicked");
    console.log(this.transForm);
    const invalid = [];
        const controls = this.transForm.controls;
        for (const name in controls) {

            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
        
    
    if(this.transForm.valid){
      console.table(this.transForm.value)
      this.trans.deb_acc=this.transForm.get('deb_acc').value;
      this.trans.cred_acc=this.transForm.get('cred_acc').value;
      this.trans.tran_date=this.transForm.get('tran_date').value;
      this.trans.transac_amt=this.transForm.get('trans_amt').value;
      this.trans.remark=this.transForm.get('remark').value;
      

      this.ser.AddTransaction(this.trans).subscribe();
      this.transForm.reset()
      console.table(this.transForm.value)
      this.transForm.reset()
    }
}
}
