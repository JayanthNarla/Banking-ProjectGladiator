import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountStatementService
{
    constructor(private client:HttpClient)
    {}
    public getTopTransaction(user:string)
    {
        return this.client.get("http://localhost:52759/api/Statement?cus="+user);
    }
    public getTransactions(user:string,from:Date,to:Date)
    {
        return this.client.get("http://localhost:52759/api/Statement?cus="+user+"&from="+from+"&to="+to);
    }
    public getAccountDetails(user:string)
    {
        return this.client.get("http://localhost:52759/api/Statement?user="+user);
    }
}