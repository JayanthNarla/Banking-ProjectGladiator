import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class TransactionService {
    trans:Transaction;
    constructor(private client:HttpClient)
    {}
    public AddTransaction(t:Transaction)
    {
        return this.client.post("http://localhost:52759/api/Transaction",t);
    }
    public GetPassword(acc_no:string)
    {
        return this.client.get("http://localhost:52759/api/Transaction?acc_no="+acc_no);
    }
    public getData(t:Transaction)
    {
        this.trans=t;
    }
    public passData()
    {
        return this.trans;
    }
}