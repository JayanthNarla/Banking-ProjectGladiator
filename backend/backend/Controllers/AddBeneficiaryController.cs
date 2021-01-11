using backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;



namespace backend.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]

    public class AddBeneficiaryController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage Beneficiary(tblBeneficiary ben)
        {
            DbContextTransaction transaction = entities.Database.BeginTransaction();

            try
            {
                tblBeneficiary bene = new tblBeneficiary();
                bene.ben_acc_num = ben.ben_acc_num;
                bene.cust_id = ben.cust_id;
                bene.ben_name = ben.ben_name;
                bene.nickname = ben.nickname;

                entities.tblBeneficiary.Add(bene);
                entities.SaveChanges();
                transaction.Commit();

            }
            catch (Exception)
            {
                transaction.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Not Found");
            }
            return Request.CreateResponse("Beneficiary Added");
        }

            public HttpResponseMessage GetAccountType(string ben_acc_num)
            {
            tblAccounts acc_type = entities.tblAccounts.Where(t =>t.acc_number == ben_acc_num).FirstOrDefault();
            if (acc_type == null)

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Account Number");

            else
            
                 return Request.CreateResponse("Valid Account Number");
            }
            public HttpResponseMessage GetBeneficiaries()
            {
                List<proc_GetBeneficiaries_Result> ben = entities.proc_GetBeneficiaries().ToList();
            if (ben.Count > 0)
                return Request.CreateResponse(ben);
            else
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "No beneficiary");
            }

    }
            
           




        
}

