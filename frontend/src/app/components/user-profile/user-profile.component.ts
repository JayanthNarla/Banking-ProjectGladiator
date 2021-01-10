import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { PersonalDetails } from 'src/app/Models/personal-details';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any
  aadhar:any
  Valid:boolean=false
  isSubmitted:boolean=false
  isUpdate:boolean=false
  userForm:FormGroup
  userUpdate=null
  constructor(private service:UserProfileService,private toast:ToastrService,private fb:FormBuilder) { 
    this.userForm=this.fb.group({
      title:["",Validators.required],
      last_name:["",Validators.required],
      phone:["",Validators.required],
      cust_mail:["",Validators.required],
      res_address:["",Validators.required],
      perm_address:["",Validators.required],
      age:["",Validators.required]
    })

  }

  getUser(id:any){
    this.aadhar=id.value
    this.service.getUserById(this.aadhar).subscribe(data=>{
      this.user=data
      this.isSubmitted=true
      
    },
    (err:HttpErrorResponse)=>
    {
      this.toast.error("Invalid Aadhar")
    })
    console.log("Clicked");
    
  }

  Update(aadhar:any){
    this.isUpdate=true
    this.service.getUserById(this.aadhar).subscribe(data=>{
      this.userUpdate=data
      this.userForm.controls['title'].setValue(this.userUpdate.title)
      this.userForm.controls['last_name'].setValue(this.userUpdate.last_name)
      this.userForm.controls['phone'].setValue(this.userUpdate.phone)
      this.userForm.controls['cust_mail'].setValue(this.userUpdate.cust_mail)
      this.userForm.controls['age'].setValue(this.userUpdate.age)
      this.userForm.controls['res_address'].setValue(this.userUpdate.res_address)
      this.userForm.controls['perm_address'].setValue(this.userUpdate.perm_address)
  })
  }
  PutSubmit(profile:PersonalDetails){
    console.log(profile);
    this.service.getUserById(this.aadhar).subscribe(data=>{
      this.user=data
    })
    profile.aadhar=this.user.aadhar
    profile.first_name=this.user.first_name
    profile.middle_name=this.user.middle_name
    profile.cust_id=this.user.cust_id
    profile.dob=this.user.dob
    profile.gender=this.user.gender

    
    this.service.updateUserById(profile).subscribe(data=>{
      let details = data 
      this.user=data
      this.toast.success("Successfully Updated Changes")
      console.log(details);

      
    })
    this.isUpdate=false
    console.log("button clicked");
    
  }
  ngOnInit(): void {
  }

}
