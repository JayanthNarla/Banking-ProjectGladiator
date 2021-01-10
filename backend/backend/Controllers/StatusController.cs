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
    [RoutePrefix("api/status")]
    public class StatusController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage getAppStatus(tblCustomer cust)
        {
            proc_getAppStatus_Result result = null;
            result = entities.proc_getAppStatus(cust.cust_id).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not yet registered");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public HttpResponseMessage GetAllAppStatus()
        {
            List<proc_getAllAppStatus_Result> result = null;
            result = entities.proc_getAllAppStatus().ToList();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No registerations");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPut]
        
        public HttpResponseMessage Put(int id, tblStatus sts)
        {
            DbContextTransaction transaction = entities.Database.BeginTransaction();
            try
            {
                DateTime now = DateTime.Now;
                tblStatus updateStatus = entities.tblStatus.Find(id);
                updateStatus.acc_status = sts.acc_status;
                updateStatus.app_date = now;
                entities.SaveChanges();

                Random _random = new Random();

                string acc_number_tail = _random.Next(100000000, 1000000000).ToString();
                string acc_number = "PGBNKG" + acc_number_tail;

                string balance = _random.Next(100, 100000000).ToString();

                //Console.WriteLine(acc_number.Length);
                entities.proc_pushTotblAccounts(sts.cust_id, acc_number, balance);
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not update the table");
            }
            return Request.CreateResponse(HttpStatusCode.Accepted, sts);
        }
        [Route("getPending")]
        [HttpGet]
        public HttpResponseMessage GetAllPendingAppStatus()
        {
            List<proc_getAllPendingAppStatus_Result> result = null;
            result = entities.proc_getAllPendingAppStatus().ToList();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Pending Approvals");
            else 
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [Route("getApplicationByRef")]
        [HttpPost]
        public HttpResponseMessage GetApplicationByRef(tblStatus sts)
        {
            proc_getApplicationByRefno_Result result = null;
            result = entities.proc_getApplicationByRefno(sts.ref_no).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Application Found");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [Route("getApproved")]
        [HttpGet]
        public HttpResponseMessage GetAllProvedAppStatus()
        {
            List<proc_getAllApprovedAppStatus_Result> result = null;
            result = entities.proc_getAllApprovedAppStatus().ToList();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Pending Approvals");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [Route("getDenied")]
        [HttpGet]
        public HttpResponseMessage GetAllDeniedAppStatus()
        {
            List<proc_getAllDeniedAppStatus_Result> result = null;
            result = entities.proc_getAllDeniedAppStatus().ToList();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Pending Approvals");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }

    }
}
