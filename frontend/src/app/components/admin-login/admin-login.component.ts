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

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Login;
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

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ls: LoginService
  ) {
    this.user = new Login();
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
    console.log(this.user.cust_id);
    console.log(this.user.pwd);
    this.ls.userLogin(this.user).subscribe((data) => {
      console.log(data);
      if (data['user_type'] == 'admin') {
        this.router.navigate(['admindash']);
      } else if (data['user_type'] == 'customer') {
        this.router.navigate(['userdash']);
      }
    });
  };
  ngOnInit(): void {}
}
