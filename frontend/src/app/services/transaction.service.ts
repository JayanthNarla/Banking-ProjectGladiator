import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class TransactionService {

    constructor(private client:HttpClient)
    {}
    public AddTransaction(t:Transaction)
    {
        return this.client.post("http://localhost:52759/api/Transaction",t);
    }
}