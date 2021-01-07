using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using backend.Models;

namespace backend.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class TransactionController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage PostTransaction(tblTransaction trans)
        {
            DbContextTransaction dbContext = entities.Database.BeginTransaction();
            Random ran = new Random();
            string id = ran.Next(100, 1000).ToString();
            string str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for(int i=0;i<8;i++)
            {
                int x = ran.Next(26);
                id = str[x] + id;
            }

            try
            {
                tblAccounts debAccount = entities.tblAccounts.Where(d => d.acc_number == trans.deb_acc).FirstOrDefault();
                tblAccounts credAccount = entities.tblAccounts.Where(d => d.acc_number == trans.cred_acc).FirstOrDefault();
                debAccount.balance = (Convert.ToInt32(debAccount.balance) - Convert.ToInt32(trans.transac_amt)).ToString();
                credAccount.balance = (Convert.ToInt32(credAccount.balance) + Convert.ToInt32(trans.transac_amt)).ToString();

                trans.transaction_id = id;
                trans.acc_number = trans.deb_acc;
                trans.deb_bal = debAccount.balance;
                trans.cred_bal = credAccount.balance;

                entities.tblTransaction.Add(trans);
                entities.SaveChanges();
                dbContext.Commit();
            }
            catch(Exception)
            {
                dbContext.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Not Found");
            }
            return Request.CreateResponse("Transaction Successful");
            
        }
    }
}
