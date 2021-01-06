import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
pdform:FormGroup;
submitted:boolean=false
error_messages = {
  first_name: [
    { type: 'required', message: 'First Name is required' },
  {
    type: 'minlength',
    message: 'first name length must be between 6 and 10 characters',
  },
  {
    type: 'maxlength',
    message: 'first name length must be between 6 and 10 characters',
  },
],

  last_name: [
    { type: 'required', message: 'Last Name is required' },
    {
      type: 'minlength',
      message: 'last name length must be between 6 and 10 characters',
    },
    {
      type: 'maxlength',
      message: ' length must be between 6 and 10 characters',
    },
  ],
  cust_mail:[
    { type: 'required', 
    message: 'Email is required' },
    {
      type: 'pattern',
      message:
        'proper email is required',
    },
  ],
  phone:[
    { type: 'required', message: 'phone number is required' },
      {
        type: 'minlength',
        message: 'phone number length must be 10 characters',
      },
      {
        type: 'maxlength',
        message: 'phone number length must be 10 characters',
      },
  ],
  father_name:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  dob:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  aadhar:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  gender:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  title:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  res_address:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
  perm_address:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
};
  constructor(private FormBuilder:FormBuilder) { 
    this.pdform=this.FormBuilder.group({
      title:["",Validators.required],
      aadhar:["",Validators.required],
      first_name:["",[Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
      middle_name:[""],
      last_name:["",[Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
      father_name:["",Validators.required],
      phone:["",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      cust_mail:["",[Validators.required,  
        Validators.pattern(
          
          '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' )]],
      res_address:["",Validators.required],
      perm_address:["",Validators.required],

      dob:["",Validators.required],
      // age:["",Validators.required],
      gender:["",Validators.required]
      
    })
  }

  onSubmit(){
    this.submitted=true
    console.log("button clicked");
    console.log(this.pdform);
    const invalid = [];
        const controls = this.pdform.controls;
        for (const name in controls) {

            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
        
    
    if(this.pdform.valid){
      console.table(this.pdform.value)
      this.pdform.reset()
    }

  }

  ngOnInit(): void {
  }

}
