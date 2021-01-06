import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-password',
  templateUrl: './transaction-password.component.html',
  styleUrls: ['./transaction-password.component.css']
})
export class TransactionPasswordComponent implements OnInit {
  public passForm:FormGroup;
  public error_messages = {
    pass: [{ type: 'maxlength', message: 'Remark cannot exceed 50 alphabets' }]
  };

  constructor(private formBuilder:FormBuilder) {
    
    this.passForm = this.formBuilder.group({
      pass:new FormControl('',Validators.maxLength(50)),
    });
  }

  ngOnInit(): void {
  }
  onReset()
  {
    this.passForm.reset();
  }
}
