import { Application } from './../../models/Application';
import { Customer } from './../../models/Customer';
import { CustomerService } from './../../services/customer.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-approved-list',
  templateUrl: './all-approved-list.component.html',
  styleUrls: ['./all-approved-list.component.css'],
})
export class AllApprovedListComponent implements OnInit {
  closeResult = '';
  customers: any;
  cust: Customer;
  applications: any;
  application_id: Application;
  application_status: Application;
  applications_size: number;

  constructor(private modalService: NgbModal, private cs: CustomerService) {
    this.customers = [];
    this.cust = new Customer();
    this.application_id = new Application();
    this.application_status = new Application();

    this.cs.getAllCustomers().subscribe((custData) => {
      // console.log(custData);
      this.customers = custData;
      this.cs.getAllApprovedAppStatus().subscribe((aplData) => {
        console.log(aplData);
        this.applications = aplData;
        this.applications_size = Object.keys(this.applications).length;
      });
    });
  }

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
