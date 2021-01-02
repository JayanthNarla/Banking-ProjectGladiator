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
                tblStatus updateStatus = entities.tblStatus.Find(id);
                updateStatus.acc_status = sts.acc_status;
                entities.SaveChanges();

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
