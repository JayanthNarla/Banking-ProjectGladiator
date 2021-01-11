import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {Add_beneficiary} from 'src/app/models/add_ben.model'
import { AccountStatementService } from 'src/app/services/accountstatement.service';
import { BeneficiaryService } from 'src/app/services/beneficiary.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  ben:Add_beneficiary;
  submitted=false;
  ba:string="";
  useracc:any;

  public BeneficiaryForm:FormGroup;
  error_messages = {
    ben_name: [
      { type: 'required', message: 'Beneficiary name is required' },
      { type: 'maxLength', message: 'Beneficiary name cannot exceed 50 alphabets' }],
    ben_acc_num: [
      { type: 'required', message: ' Account number is required' },
      { type: 'maxLength', message: ' Account number cannot exceed 15 digits' },
      {type:'minlength',message:'Beneficiary account number must be 15 digits'}],
    Re_enterAccount_num: [
      { type: 'required', message: 'Account number is required' },
      { type: 'maxLength', message: ' Account number does not match with the ben_Acc_num' },
      {type:'minlength',message:'Account number be 15 digits'},
      {type:'Valid',message:'Entered Account number mismatches with the Beneficiary Accountnumber'}],
    check:[{type:'required', message: 'Confirm adding beneficiary'}],
    nickname:[
     {type:'maxlength',message :'Nickname cannot exceed 20 alphabets'}],
  }

  constructor(private toastr:ToastrService, private formBuilder:FormBuilder,private ser:BeneficiaryService,private acc:AccountStatementService) 
  {
    this.ben = new Add_beneficiary();
     this.acc.getAccountDetails(JSON.parse(localStorage.getItem('cust_id'))['value']).subscribe(d=>this.useracc=d);
     this.BeneficiaryForm = this.formBuilder.group({
      ben_name:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
      ben_acc_num:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(15)])),
      Re_enterAccount_num:new FormControl('',Validators.compose([Validators.required, Account,Validators.maxLength(15),Validators.minLength(15)])),
      check:new FormControl('',Validators.required),
      nickname:new FormControl('',Validators.maxLength(20)),
    });
  }

  ngOnInit(): void {}
  
  onReset()
   {
     this.BeneficiaryForm.reset();
   }

   onSubmit(){
    
    console.log("button clicked");
    console.log(this.BeneficiaryForm);
    
       
   if(this.BeneficiaryForm.valid){
    console.table(this.BeneficiaryForm.value)
    this.ben.ben_acc_num=this.BeneficiaryForm.get('ben_acc_num').value;
    this.ben.ben_name=this.BeneficiaryForm.get('ben_name').value;
    this.ben.Re_enterAccount_num=this.BeneficiaryForm.get('Re_enterAccount_num').value;
    this.ben.nickname=this.BeneficiaryForm.get('nickname').value;
    this.ben.cust_id = JSON.parse(localStorage.getItem('cust_id'))['value'];
    
    this.ser.AddBeneficiary(this.ben).subscribe(data => {this.toastr.success("Beneficiary added successfully")},err=>{this.toastr.info("Beneficiary already exists")});
    this.BeneficiaryForm.reset()
    
 }
}
validateBen_acc()
{
    ba = this.BeneficiaryForm.get("ben_acc_num").value;
    this.ser.GetAccountType(ba).subscribe(
    b=>present=b.toString(),
    err=>{this.toastr.error("Invalid Account number");this.BeneficiaryForm.get("ben_acc_num").setValue("")})
}

checkAcc()
{
  if(this.BeneficiaryForm.get('ben_acc_num').value==this.useracc.acc_number)
  {
    this.toastr.info("You cannot add yourself as beneficiary");
    this.BeneficiaryForm.get('ben_acc_num').setValue("");
  }
}
}

var ba;
var present:string="";
function Account(control:AbstractControl):{[key:string]:any}
{
  const ca = control.value;
  if(ba==ca)
  {
    return null
  
  }
  else{
    return {'Valid':true}
  }
}





