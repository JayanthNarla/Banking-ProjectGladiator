import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  public BeneficiaryForm:FormGroup;
  error_messages = {
    Beneficiary_Name: [{ type: 'required', message: 'Beneficiary name is required' },{ type: 'maxLength', message: 'Beneficiary_name cannot exceed 50 alphabets' }],
    Bene_acc_num: [{ type: 'required', message: ' Account number is required' },{ type: 'maxLength', message: ' Account number cannot exceed 20 alphabets' }],
   Re_enterAccount_num: [{ type: 'required', message: 'Account number is required' },{ type: 'maxLength', message: ' Account number does not match with the bene_Acc_num' }],
    nickname: [{ type: 'required', message: 'Nick name cannot exceed 20 alphabets' }],
  }

  constructor(private formBuilder:FormBuilder) 
  {
     this.BeneficiaryForm = this.formBuilder.group({
      Beneficiary_Name:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
      Bene_acc_num:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(20)])),
      Re_enterAccount_num:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(20)])),
    nickname:new FormControl('',Validators.maxLength(20)),
      
    });


   }

  ngOnInit(): void {
  }

}
