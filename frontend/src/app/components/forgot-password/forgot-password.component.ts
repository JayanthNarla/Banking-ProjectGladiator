import { Account } from './../../models/account.model';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Login } from './../../models/Login';
import { Customer } from './../../models/Customer';
import { Otp } from './../../models/Otp';
import { OtpService } from './../../services/otp.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  frgtPwd: FormGroup;
  otp: Otp;
  cust: Customer;
  mailID: string;
  UpdPwd: FormGroup;
  user: Login;

  error_messages = {
    mail: [{ type: 'required', message: 'Email ID is required' }],
    acc_num: [{ type: 'required', message: 'Account Number is required' }],
    pwd: [
      { type: 'required', message: 'password is required' },
      {
        type: 'minlength',
        message: 'password length must be between 8 and 16 characters',
      },
      {
        type: 'maxlength',
        message: 'password length must be between 8 and 16 characters',
      },
      {
        type: 'pattern',
        message:
          'password must consist one special character,one alphabet and one numeric',
      },
    ],
    cpwd: [
      { type: 'required', message: 'password is required' },
      {
        type: 'minlength',
        message: 'password length must be between 8 and 16 characters',
      },
      {
        type: 'maxlength',
        message: 'password length must be between 8 and 16 characters',
      },
      {
        type: 'pattern',
        message:
          'password must consist one special character,one alphabet and one numeric',
      },
    ],
  };
  sentOTP: boolean;
  toast: string;
  pDets: any;

  constructor(
    public formBuilder: FormBuilder,
    private os: OtpService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ls: LoginService,
    private router: Router
  ) {
    this.pDets = new Account();
    this.otp = new Otp();
    this.cust = new Customer();
    this.toast = 'toast';
    this.user = new Login();
    this.frgtPwd = this.formBuilder.group({
      otp: new FormControl(''),
      mail: new FormControl('', Validators.compose([Validators.required])),
      acc_num: new FormControl('', Validators.compose([Validators.required])),
    });
    this.UpdPwd = this.formBuilder.group({
      pwd: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ])
      ),
      cpwd: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ])
      ),
    });
  }

  updatePassword = () => {
    let pwd = this.UpdPwd.get('pwd').value;
    let cpwd = this.UpdPwd.get('cpwd').value;
    if (pwd == cpwd) {
      this.user.pwd = cpwd;
      this.user.cust_id = this.frgtPwd.get('acc_num').value;

      this.ls.updatePassword(this.user).subscribe((data) => {
        this.toastr.success(`Password Updated`);
        this.modalService.dismissAll();
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.error('Both Password fields should be the same');
    }
  };

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  verifyOTP = (content) => {
    let enteredOtp = this.frgtPwd.get('otp').value;
    if (enteredOtp == this.otp.send_otp) {
      this.modalService.open(content, {
        centered: true,
        size: 'lg',
        scrollable: true,
      });
    } else {
      this.toastr.error(`Enter correct OTP`);
    }
  };

  verifyMailAndGenOTP = () => {
    let usermail = this.frgtPwd.get('mail').value;
    this.otp.mail = usermail;
    // console.log(usermail);
    this.pDets.acc_number = this.frgtPwd.get('acc_num').value;

    this.os.verifyMailByAccNum(this.pDets).subscribe((data) => {
      if (usermail == data['cust_mail']) {
        this.sentOTP = true;
        this.otp.send_otp = this.randomNumber(10000, 100000).toString();

        this.os.generateOTP(this.otp).subscribe((msg) => {
          // console.log(msg);
          this.toastr.success(`OTP Sent to registered mail ID`);
        });
      } else {
        this.toastr.error(`Enter correct Customer ID and Mail ID`);
      }
    });
  };

  ngOnInit(): void {}
}
