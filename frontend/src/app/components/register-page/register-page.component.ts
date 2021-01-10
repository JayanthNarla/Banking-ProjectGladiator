import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Iregister} from '../../Models/iregister';
import { RegisterPageService } from 'src/app/services/register-page.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import{ConfirmedValidator} from '../../components/register-page/confirmed.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  iregister:FormGroup
  submitted:boolean=false
  randomNumber:number
  lastNumber:number
  register:Iregister
  isValid:boolean=false
  Valid:boolean=false
  pwdValue:any
  cpwdValue:any
  TpwdValue:any
  CTpwdValue:any
  
  error_messages = {
    account_number: [
      { type: 'required',
       message: 'acct number is required' },
       {
        type: 'minlength',
        message: ' length must be 15 characters',
      },
      {
        type: 'maxlength',
        message: ' length must be 15 characters',
      },
    ],

    password: [
      { type: 'required', message: 'password is required' },
      {
        type: 'minlength',
        message: 'min length is 8',
      },
      {
        type: 'maxlength',
        message: 'max length is 16',
      },
      {
        type: 'pattern',
        message: "'password must have a special character,alphabet and numeric'",
      },
    ],
  };

  constructor(private fb:FormBuilder,private service:RegisterPageService,private toast:ToastrService) {
    while(this.lastNumber==this.randomNumber){
      this.lastNumber=Math.floor(Math.random()*90000)+(10000)
    }
    this.randomNumber=this.lastNumber
    this.register=new Iregister()
    this.iregister=this.fb.group({
      cust_id:[this.randomNumber],
      acc_number:["",[Validators.required,Validators.minLength(15),Validators.maxLength(15)]],
      pwd:["",[Validators.required, Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        )]], 
        // cpwd:["",[Validators.required, Validators.minLength(6),
        //   Validators.maxLength(15),
        //   Validators.pattern(
        //     '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        //   )]],  
        Tpwd:["",[Validators.required, Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          )]],
          // CTpwd:["",[Validators.required, Validators.minLength(6),
          //   Validators.maxLength(15),
          //   Validators.pattern(
          //     '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          //   )]],
            
    },
    {
      Validator:ConfirmedValidator('Tpwd','CTpwd')
    }


   
  
    )

    // this.pwdValue=this.iregister.get('pwd').value
    // this.cpwdValue = this.iregister.get('cpwd').value
    //  if(this.pwdValue != this.cpwdValue){
    //    this.isValid=true
    //  }
    //  this.TpwdValue=this.iregister.get('Tpwd').value
    // this.CTpwdValue = this.iregister.get('CTpwd').value
    //  if(this.TpwdValue != this.CTpwdValue){
    //    this.Valid=true
    //  }
  
    

   }
   onSubmit(){

    

     this.register.cust_id=this.randomNumber.toString()
     this.service.postInternetDetails(this.register).subscribe(data=>
      {console.log(data)
        this.toast.success("Submitted Successfully")
        this.iregister.reset()
      },
      (error:HttpErrorResponse)=>
      {
            console.log(error.error);
            
            this.toast.error("Invalid Account Number");
            this.iregister.reset()
      })

   }

  ngOnInit(): void {
  }

}
