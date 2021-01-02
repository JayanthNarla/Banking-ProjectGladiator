import { Application } from './../../models/Application';
import { Customer } from './../../models/Customer';
import { CustomerService } from './../../services/customer.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  //Navbar props
  main = 'All Applications';
  opt1 = 'Pending List';
  opt2 = 'Approved List';
  opt3 = 'Denied List';
  mainLink = './';
  link1 = 'pending';
  link2 = 'approved';
  link3 = 'denied';

  isLogin = false;

  constructor() {}

  ngOnInit(): void {}
}
