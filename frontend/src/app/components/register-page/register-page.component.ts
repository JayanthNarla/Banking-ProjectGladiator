import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  iregister: FormGroup;
  submitted: boolean = false;

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

  constructor(private fb: FormBuilder) {
    this.iregister = this.fb.group({
      acc_number: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
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
      otp: [' ', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.iregister.valid) {
      console.table(this.iregister.value);
      this.iregister.reset();
    }
  }

  ngOnInit(): void {}
}
