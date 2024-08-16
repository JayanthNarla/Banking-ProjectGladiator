using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using backend.Models;

namespace backend.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class StatementController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();
        public HttpResponseMessage GetTopStatement(string cus)
        {
            try
            {
                string acc = entities.tblLogin.Where(t => t.cust_id == cus).FirstOrDefault().acc_number;
                List<proc_GetTopTransactions_Result> summary = entities.proc_GetTopTransactions(acc).ToList();
                return Request.CreateResponse(summary);
            }
            catch(Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something went wrong");
            }
        }
        public HttpResponseMessage GetStatement(string cus,DateTime from,DateTime to)
        {
            try
            {
                string acc = entities.tblLogin.Where(t => t.cust_id == cus).FirstOrDefault().acc_number;
                List<proc_GetTransactionsWithinDate_Result> summary = entities.proc_GetTransactionsWithinDate(acc,from,to).ToList();
                return Request.CreateResponse(summary);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something went wrong");
            }
        }
        public proc_GetAccountDetails_Result GetDetails(string user)
        {
            string acc = entities.tblLogin.Where(t => t.cust_id == user).FirstOrDefault().acc_number;
            proc_GetAccountDetails_Result account = entities.proc_GetAccountDetails(acc).FirstOrDefault();
            return account;
        }
    }
}
