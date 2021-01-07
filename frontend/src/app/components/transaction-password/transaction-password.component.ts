import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-password',
  templateUrl: './transaction-password.component.html',
  styleUrls: ['./transaction-password.component.css']
})
export class TransactionPasswordComponent implements OnInit {
  public passForm:FormGroup;
  submitted=false;
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
  onSubmit(){
    this.submitted=true
    console.log("button clicked");
    console.log(this.passForm);
    const invalid = [];
        const controls = this.passForm.controls;
        for (const name in controls) {

            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
        
    
    if(this.passForm.valid){
      console.table(this.passForm.value)
      this.passForm.reset()
    }
}
}
