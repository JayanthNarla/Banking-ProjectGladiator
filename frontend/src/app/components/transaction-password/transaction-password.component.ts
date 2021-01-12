import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-password',
  templateUrl: './transaction-password.component.html',
  styleUrls: ['./transaction-password.component.css'],
})
export class TransactionPasswordComponent implements OnInit {
  public passForm: FormGroup;
  tran: Transaction;
  submitted = false;
  public error_messages = {
    pass: [
      { type: 'maxlength', message: 'Remark cannot exceed 50 characters' },
      { type: 'InvalidPassword', message: 'Invalid Password' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private ser: TransactionService,
    private route: Router,
    private toastr: ToastrService
  ) {
    window.history.forward();
    this.tran = this.ser.passData();
    this.ser
      .GetPassword(this.tran.deb_acc)
      .subscribe((d) => (pwd = d.toString()));
    this.passForm = this.formBuilder.group({
      pass: new FormControl(
        '',
        Validators.compose([
          InvalidPassword,
          Validators.required,
          Validators.maxLength(15),
        ])
      ),
    });
  }

  ngOnInit(): void {}

  onReset() {
    this.passForm.reset();
  }

  onSubmit() {
    if (this.passForm.valid) {
      console.table(this.passForm.value);
      this.ser.AddTransaction(this.tran).subscribe(
        (data) => {
          this.tran.transaction_id = data.toString();
          this.route.navigate(['userdash/success']);
        },
        (err) => {
          this.toastr.error('Insufficient Balance'),
            this.route.navigate(['userdash/cancel']);
        }
      );
      this.passForm.reset();
    }
  }

  ontouch() {
    this.passForm.get('pass').markAsTouched();
  }
}

var pwd: string = '';

function InvalidPassword(control: AbstractControl): { [key: string]: any } {
  const entered = control.value;
  if (entered == pwd) {
    return null;
  } else {
    return { InvalidPassword: true };
  }
}
