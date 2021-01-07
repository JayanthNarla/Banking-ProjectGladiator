import { Application } from './../../models/Application';
import { Customer } from './../../models/Customer';
import { CustomerService } from './../../services/customer.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-pending-list',
  templateUrl: './all-pending-list.component.html',
  styleUrls: ['./all-pending-list.component.css'],
})
export class AllPendingListComponent implements OnInit {
  closeResult = '';
  customers: any;
  cust: Customer;
  applications: any;
  application_id: Application;
  application_status: Application;
  toast: string;
  applications_size: number;

  constructor(
    private modalService: NgbModal,
    private cs: CustomerService,
    private toastr: ToastrService
  ) {
    this.customers = [];
    this.cust = new Customer();
    this.application_id = new Application();
    this.application_status = new Application();
    this.toast = 'toast';

    this.cs.getAllCustomers().subscribe((custData) => {
      console.log(custData);
      this.customers = custData;
      this.cs.getAllPendingAppStatus().subscribe((aplData) => {
        console.log('application data ', aplData);
        this.applications = aplData;
        this.applications_size = Object.keys(this.applications).length;
      });
    });
  }

  approve = () => {
    let custId = document.getElementById('custId').getAttribute('value');
    // console.log(custId);

    this.application_id.cust_id = custId;
    console.log('appl_Size', this.applications_size);
    this.cs.getAppStatus(this.application_id).subscribe((data) => {
      console.log('app data ref no ', data);
      // console.log(typeof this.applications[0]['ref_no']);

      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i]['cust_id'] == data['cust_id']) {
          // this.customers.splice(i, 1);
          this.application_status.acc_status = 'approved';
          // console.log(this.application_status);

          this.cs
            .toggleStatus(data['ref_no'], this.application_status)
            .subscribe((d) => {
              this.toastr.success(`RefNo. ${data['ref_no']} is Approved`);
              this.cs.getAllPendingAppStatus().subscribe((aplData) => {
                console.log(aplData);
                this.applications = aplData;
              });
            });
          this.applications_size--;
        }
      }
    });
  };

  deny = () => {
    let custId = document.getElementById('custId').getAttribute('value');
    // console.log(custId);

    this.application_id.cust_id = custId;

    this.cs.getAppStatus(this.application_id).subscribe((data) => {
      console.log('app data ref no ', data['ref_no']);
      // console.log(typeof this.applications[0]['ref_no']);

      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i]['cust_id'] == data['cust_id']) {
          // this.customers.splice(i, 1);
          this.application_status.acc_status = 'denied';
          // console.log(this.application_status);

          this.cs
            .toggleStatus(data['ref_no'], this.application_status)
            .subscribe((d) => {
              this.toastr.error(`RefNo. ${data['ref_no']} is Denied`);
              this.cs.getAllPendingAppStatus().subscribe((aplData) => {
                console.log(aplData);
                this.applications = aplData;
              });
            });
        }
      }
    });
  };

  open(content, cust: Customer) {
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });

    document.getElementById('name').setAttribute('value', cust.cust_name);
    document.getElementById('aadhar').setAttribute('value', cust.aadhar);
    document.getElementById('custId').setAttribute('value', cust.cust_id);
    document
      .getElementById('fatherName')
      .setAttribute('value', cust.father_name);
    document.getElementById('phone').setAttribute('value', cust.phone);
    document.getElementById('mailid').setAttribute('value', cust.cust_mail);
    document.getElementById('age').setAttribute('value', cust.age);
    document.getElementById('resAdd').setAttribute('value', cust.res_address);
    document.getElementById('gender').setAttribute('value', cust.gender);
    document.getElementById('dob').setAttribute('value', cust.dob.slice(0, 10));
  }

  ngOnInit(): void {}
}
