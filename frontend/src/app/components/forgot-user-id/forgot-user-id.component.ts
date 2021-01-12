import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IBDets } from './../../models/IBDets';
import { Login } from './../../models/Login';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-user-id',
  templateUrl: './forgot-user-id.component.html',
  styleUrls: ['./forgot-user-id.component.css'],
})
export class ForgotUserIdComponent implements OnInit {
  frgtid: FormGroup;
  pDets: any;
  toast: string;
  error_messages = {
    acc_number: [{ type: 'required', message: 'Account Number  is required' }],
  };
  constructor(
    private formBuilder: FormBuilder,
    private ps: PersonalDetailsService,
    private toastr: ToastrService
  ) {
    this.pDets = new IBDets();
    this.toast = 'toast';
    this.frgtid = this.formBuilder.group({
      acc_number: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  onSubmit = () => {
    this.pDets.acc_number = this.frgtid.get('acc_number').value;
    this.ps.forgotUID(this.pDets).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Mail Sent to registered mail ID');
      },
      (err) => {
        this.toastr.error('Enter Correct Account Number');
      }
    );
  };

  ngOnInit(): void {}
}
