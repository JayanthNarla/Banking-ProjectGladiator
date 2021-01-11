import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-success',
  templateUrl: './transaction-success.component.html',
  styleUrls: ['./transaction-success.component.css']
})
export class TransactionSuccessComponent implements OnInit {
  tran:Transaction;
  from:string="xxxxxxxxxxxx";
  to:string="xxxxxxxxxxxx";
  message="";
  constructor(private ser:TransactionService) { 
    this.tran=this.ser.passData();
    this.from=this.from+this.tran.deb_acc.substring(12);
    this.to=this.to+this.tran.cred_acc.substring(12);
    if(this.tran.transaction_type=='neft')
      this.message="<dl><dt>Please note:</dt><dd>This transaction may take 2-3 hours to reflect</dd>"
    else if(this.tran.transaction_type=='rtgs')
      this.message="<dl><dt>Please note:</dt><dd>This transaction may take 30 minutes to reflect</dd>"
  }

  ngOnInit(): void {
  }

}
