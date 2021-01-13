import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { Application } from './../../models/Application';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-track-application',
  templateUrl: './track-application.component.html',
  styleUrls: ['./track-application.component.css'],
})
export class TrackApplicationComponent implements OnInit {
  trackForm: FormGroup;
  application: Application;
  error_messages = {
    ref_num: [{ type: 'required', message: 'ref_num is required' }],
  };
  toast: string;
  constructor(
    public formBuilder: FormBuilder,
    private cs: CustomerService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.toast = 'toast';
    this.application = new Application();
    this.trackForm = this.formBuilder.group({
      ref_num: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  getStatus = (content: any) => {
    this.cs.GetApplicationByRef(this.application).subscribe(
      (data) => {
        this.modalService.open(content, {
          centered: true,
          size: 'lg',
          scrollable: true,
        });

        document.getElementById('ref_no').setAttribute('value', data['ref_no']);
        document
          .getElementById('cust_id')
          .setAttribute('value', data['cust_id']);
        document.getElementById('app_by').setAttribute('value', data['app_by']);
        document
          .getElementById('app_date')
          .setAttribute('value', data['app_date'].slice(0, 10));
        document
          .getElementById('acc_status')
          .setAttribute('value', data['acc_status']);
      },
      (err) => {
        this.toastr.error('Invalid Reference number');
        this.trackForm.reset();
      }
    );
  };
  ngOnInit(): void {}
}
