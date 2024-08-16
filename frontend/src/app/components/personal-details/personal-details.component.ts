import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import { PersonalDetails } from '../../Models/personal-details';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  pdform: FormGroup;
  submitted: boolean = false;
  randomNumber: number;
  lastNumber: number;
  personalDetails: PersonalDetails;
  phoneNum: number;
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
    cust_mail: [
      { type: 'required', message: 'Email is required' },
      {
        type: 'pattern',
        message: 'proper email is required',
      },
    ],
    phone: [
      { type: 'required', message: 'phone number is required' },
      {
        type: 'min',
        message: 'phone number length must be 10 characters',
      },
      {
        type: 'max',
        message: 'phone number length must be 10 characters',
      },
    ],
    father_name: [
      {
        type: 'required',
        message: 'Mandatory',
      },
    ],
    dob: [
      {
        type: 'required',
        message: 'Mandatory',
      },
      {
        type: 'Invalid',
        message: 'Age limit is 10yrs - 120yrs',
      },
    ],
    aadhar: [
      {
        type: 'required',
        message: 'Mandatory',
      },
      {
        type: 'minlength',
        message: 'aadhar number length must be 12 characters',
      },
      {
        type: 'maxlength',
        message: 'aadhar number length must be 12 characters',
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Mandatory',
      },
    ],
    title: [
      {
        type: 'required',
        message: 'Mandatory',
      },
    ],
    res_address: [
      {
        type: 'required',
        message: 'Mandatory',
      },
    ],
    perm_address: [
      {
        type: 'required',
        message: 'Mandatory',
      },
    ],
    age: [
      {
        type: 'required',
        message: 'Mandatory',
      },
      {
        type: 'min',
        message: 'You must be above 10 years',
      },
      {
        type: 'max',
        message: 'you must be below 120 years',
      },
    ],
  };
  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClientModule,
    private service: PersonalDetailsService,
    private toast: ToastrService,
    private route: Router
  ) {
    this.personalDetails = new PersonalDetails();
    while (this.lastNumber == this.randomNumber) {
      this.lastNumber = Math.floor(Math.random() * 90000) + 10000;
    }
    this.randomNumber = this.lastNumber;
    this.pdform = this.FormBuilder.group({
      title: ['', Validators.required],
      aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      cust_id: [this.randomNumber],
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      middle_name: [''],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      father_name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      cust_mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      res_address: ['', Validators.required],
      perm_address: ['', Validators.required],

      dob: new FormControl(
        '',
        Validators.compose([Validators.required, ValideDob])
      ),
      age: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.min(16),
          Validators.max(120),
        ])
      ),
      gender: ['', Validators.required],
    });
  }

  onSubmit(title, gender) {
    //
    this.personalDetails.title = title.value;
    this.personalDetails.gender = gender.value;
    this.personalDetails.cust_id = this.randomNumber.toString();
    this.personalDetails.phone = this.phoneNum.toString();
    this.service.postDetails(this.personalDetails).subscribe(
      (data) => {
        // console.log(data);
        this.toast.success('Successfully submitted');
        this.route.navigate(['/status', this.personalDetails.cust_id]);
        this.pdform.reset();
      },
      (err) => {
        this.toast.error('Check Details Properly');
      }
    );

    // }
  }

  ngOnInit(): void {}
}

function ValideDob(control: AbstractControl): { [key: string]: any } {
  const selected = new Date(control.value);
  var date = new Date();
  const diff = date.getFullYear() - selected.getFullYear();
  if (diff >= 10 && diff < 120) {
    return null;
  } else {
    return { Invalid: true };
  }
}
