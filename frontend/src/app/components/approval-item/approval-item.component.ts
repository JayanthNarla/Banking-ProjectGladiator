import { Customer } from './../../models/Customer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-item',
  templateUrl: './approval-item.component.html',
  styleUrls: ['./approval-item.component.css'],
})
export class ApprovalItemComponent implements OnInit {
  @Input() cust: Customer;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
