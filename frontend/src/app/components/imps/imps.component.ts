import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {

  public transForm:FormGroup;
  error_messages = {
    deb_acc: [{ type: 'required', message: 'From account is required' },{ type: 'maxLength', message: 'From account cannot exceed 20 alphabets' }],
    cred_acc: [{ type: 'required', message: 'To account is required' },{ type: 'maxLength', message: 'To account cannot exceed 20 alphabets' }],
    trans_amt: [{ type: 'required', message: 'Transaction amount is required' }],
    tran_date: [{ type: 'required', message: 'Transaction date is required' }],
    mat_ins: [{ type: 'maxlength', message: 'Maturity instruction cannot exceed 50 alphabets' }],
    remark: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }],
    
  }

  constructor(private formBuilder:FormBuilder) {
    this.transForm = this.formBuilder.group({
      deb_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(20)])),
      cred_acc:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(20)])),
      trans_amt:new FormControl('',Validators.required),
      tran_date:new FormControl('',Validators.required),
      mat_ins:new FormControl('',Validators.maxLength(50)),
      remark:new FormControl('',Validators.maxLength(50)),
    });
  }


  ngOnInit(): void {
  }

}
