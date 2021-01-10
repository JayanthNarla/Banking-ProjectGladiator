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
        string id;
        dbBankingEntities entities = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage PostTransaction(tblTransaction trans)
        {
            DbContextTransaction dbContext = entities.Database.BeginTransaction();
            Random ran = new Random();
            id = ran.Next(100, 1000).ToString();
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
                debAccount.balance = (Convert.ToSingle(debAccount.balance) - Convert.ToSingle(trans.transac_amt)).ToString();
                credAccount.balance = (Convert.ToSingle(credAccount.balance) + Convert.ToSingle(trans.transac_amt)).ToString();

                trans.transaction_id = id;
                trans.acc_number = trans.deb_acc;
                trans.deb_bal = debAccount.balance;
                trans.cred_bal = credAccount.balance;
                if (Convert.ToSingle(debAccount.balance) > 0 && Convert.ToSingle(debAccount.balance) > Convert.ToSingle(debAccount.minbalance))
                {
                    entities.tblTransaction.Add(trans);
                    entities.SaveChanges();
                    dbContext.Commit();
                }
                else
                {
                    throw new Exception("Insufficient Balance");
                }
            }
            catch(Exception e)
            {
                dbContext.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
            }
            return Request.CreateResponse(id);
            
        }
        public HttpResponseMessage GetPassword(string acc_no)
        {
            tblInternetBanking pwd = entities.tblInternetBanking.Where(t => t.acc_number == acc_no).FirstOrDefault();
            if (pwd == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Account Number");
            else
                return Request.CreateResponse(pwd.Tpwd);
        }

    }
}
