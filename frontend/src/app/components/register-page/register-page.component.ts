import { Account } from 'src/app/models/account.model';
import { PersonalDetails } from 'src/app/Models/personal-details';
import { OtpService } from './../../services/otp.service';
import { Otp } from './../../models/Otp';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iregister } from '../../Models/iregister';
import { RegisterPageService } from 'src/app/services/register-page.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../../components/register-page/confirmed.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  iregister: FormGroup;
  submitted: boolean = false;
  randomNumber: number;
  lastNumber: number;
  register: Iregister;
  isValid: boolean = false;
  Valid: boolean = false;
  pwdValue: any;
  cpwdValue: any;
  TpwdValue: any;
  CTpwdValue: any;
  sentOTP: boolean;
  toast: string;

  error_messages = {
    account_number: [
      { type: 'required', message: 'acct number is required' },
      {
        type: 'minlength',
        message: ' length must be 15 characters',
      },
      {
        type: 'maxlength',
        message: ' length must be 15 characters',
      },
    ],
    mail: [
      {
        type: 'required',
        message: 'Mail ID is required',
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
        message:
          "'password must have a special character,alphabet and numeric'",
      },
    ],
  };
  otp: Otp;
  pDetails: Account;
  verifiedOTP: boolean;

  constructor(
    private fb: FormBuilder,
    private service: RegisterPageService,
    private toastr: ToastrService,
    private os: OtpService
  ) {
    while (this.lastNumber == this.randomNumber) {
      this.lastNumber = Math.floor(Math.random() * 90000) + 10000;
    }
    this.otp = new Otp();
    this.pDetails = new Account();
    this.toast = 'toast';
    this.sentOTP = false;
    this.verifiedOTP = false;
    this.randomNumber = this.lastNumber;
    this.register = new Iregister();
    this.iregister = this.fb.group(
      {
        cust_id: [this.randomNumber],
        otp: [''],
        mail: ['', [Validators.required]],
        acc_number: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
        pwd: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(
              '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
            ),
          ],
        ],
        // cpwd:["",[Validators.required, Validators.minLength(6),
        //   Validators.maxLength(15),
        //   Validators.pattern(
        //     '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        //   )]],
        Tpwd: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(
              '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
            ),
          ],
        ],
        // CTpwd:["",[Validators.required, Validators.minLength(6),
        //   Validators.maxLength(15),
        //   Validators.pattern(
        //     '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        //   )]],
      },

      {
        Validator: ConfirmedValidator('Tpwd', 'CTpwd'),
      }
    );

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
  onSubmit() {
    this.register.cust_id = this.randomNumber.toString();
    this.service.postInternetDetails(this.register).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Submitted Successfully');
        this.iregister.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);

        this.toastr.error('Invalid Account Number');
        this.iregister.reset();
      }
    );
  }
  verifyOTP = () => {
    let enteredOtp = this.iregister.get('otp').value;
    if (enteredOtp == this.otp.send_otp) {
      this.verifiedOTP = true;
    } else {
      this.toastr.error(`Enter correct OTP`);
    }
  };
  randomNumberGen = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  verifyMailAndGenOTP = () => {
    let usermail = this.iregister.get('mail').value;
    console.log(usermail);
    this.otp.mail = usermail;

    this.pDetails.acc_number = this.iregister.get('acc_number').value;
    // console.log(this.pDetails);

    this.os.verifyMailByAccNum(this.pDetails).subscribe((data) => {
      console.log(data);

      if (usermail == data['cust_mail']) {
        this.otp.send_otp = this.randomNumberGen(10000, 100000).toString();

        this.os.generateOTP(this.otp).subscribe((msg) => {
          console.log(msg);
          this.toastr.success(`OTP Sent to registered mail ID`);
          this.sentOTP = true;
        });
      } else {
        this.toastr.error(`Enter correct Account Number and Mail ID`);
      }
    });
  };

  ngOnInit(): void {}
}
