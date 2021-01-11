import { AuthService } from './../../services/auth.service';
import { Blocked } from './../../models/Blocked';
import { LoginService } from './../../services/login.service';
import { Login } from './../../models/Login';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Login;
  blockedAcc: Blocked;
  error_messages = {
    id: [{ type: 'required', message: 'User Id is required' }],

    password: [
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
  login_count = 0;
  toast: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ls: LoginService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.toast = 'toast';
    this.user = new Login();
    this.blockedAcc = new Blocked();
    this.loginForm = this.formBuilder.group({
      id: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(6)])
      ),

      password: new FormControl(
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

  AdminLogin = () => {
    console.log('submitted');
    this.ls.userLogin(this.user).subscribe(
      (data) => {
        console.log(data['user_type']);

        if (data['user_type'] == 'admin') {
          this.authService.login('cust_id', data['cust_id'], 1);
          localStorage.setItem('loggedTime', new Date().getTime().toString());
          this.router.navigate(['admindash']);
        } else if (data['user_type'] == 'customer') {
          this.authService.login('cust_id', data['cust_id'], 1);
          localStorage.setItem('loggedTime', new Date().getTime().toString());

          this.router.navigate(['userdash']);
        }
      },
      (err) => {
        if (this.login_count == 3) {
          this.blockedAcc.cust_id = this.loginForm.get('id').value;
          console.log(this.blockedAcc);
          this.toastr.error(`You're Blocked Contact admin`);
          this.ls.setBlockedUser(this.blockedAcc).subscribe((blk) => {
            console.log(blk);
            this.login_count = 0;
          });
        } else {
          this.toastr.error(`Enter Valid Customer ID and password`);
          this.login_count = this.login_count + 1;
          console.log(this.login_count);
        }
      }
    );
  };
  ngOnInit(): void {
    this.authService.logout('cust_id');
  }
}
