import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';


@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  trans:Transaction;
  public transForm:FormGroup;
  public error_messages = {
    deb_acc: [{ type: 'required', message: 'From account is required' },{ type: 'maxlength', message: 'From account number must be 15 alphabets' },{ type: 'minlength', message: 'From account number must be 15 alphabets' }],
    cred_acc: [{ type: 'required', message: 'To account is required' },{ type: 'maxlength', message: 'To account number must 15 alphabets' },{ type: 'minlength', message: 'To account number must 15 alphabets' }],
    trans_amt: [{ type: 'required', message: 'Transaction amount is required' }],
    tran_date: [{ type: 'required', message: 'Transaction date is required' }],
    mat_ins: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }],
    remark: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }]
  };

  constructor(private formBuilder:FormBuilder) {
    this.trans=new Transaction();
    this.trans.transaction_type="rtgs";
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

}