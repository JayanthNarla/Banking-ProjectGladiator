import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import { PersonalDetails } from '../../Models/personal-details';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
pdform:FormGroup;
submitted:boolean=false
randomNumber:number
lastNumber:number
personalDetails:PersonalDetails
error_messages = {
  first_name: [
    { type: 'required', 
    message: 'First Name is required' },
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
  age:[
    {
      type:'required',
      message:'Mandatory',
    },
  ],
};

  constructor(private FormBuilder:FormBuilder,private http:HttpClientModule,private service:PersonalDetailsService,
    private toast:ToastrService,private route:Router   ) {
    
   this.personalDetails=new PersonalDetails()
    while(this.lastNumber==this.randomNumber){
      this.lastNumber=Math.floor(Math.random()*90000)+(10000)
    }
    this.randomNumber=this.lastNumber
    this.pdform=this.FormBuilder.group({
      title:["",Validators.required],
      aadhar:["",Validators.required],
      cust_id:[this.randomNumber],
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
      age:["",Validators.required],
      gender:["",Validators.required]
      
    })
    
  }

  onSubmit(title,gender){
    //   
    this.personalDetails.title=title.value;
    this.personalDetails.gender=gender.value;
    this.personalDetails.cust_id=this.randomNumber.toString();
    this.service.postDetails(this.personalDetails).subscribe(data=>{
      console.log(data)
      this.toast.success("Successfully submitted")
      this.route.navigate(['/status',this.personalDetails.cust_id])
      this.pdform.reset()
    })

    

    // }

  }

  ngOnInit(): void {
  }

}
