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
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();

        [HttpPost]
        public HttpResponseMessage GetCustDetails(tblCustomer cust)
        {
            proc_getCustDetails_Result result = null;
            result = entities.proc_getCustDetails(cust.cust_id).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Customer ID Incorrect");
            else
                return Request.CreateResponse<proc_getCustDetails_Result>(result);
        }

        [HttpGet]
        public HttpResponseMessage GetAllCustDetails()
        {
            List<proc_getAllCustDetails_Result> result = null;
            result = entities.proc_getAllCustDetails().ToList();
            if (result == null) 
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No customer registered");
            else
                return Request.CreateResponse(HttpStatusCode.OK,result);
        }

        [Route("getCustomerApplications")]
        [HttpGet]
        public HttpResponseMessage GetAllCustDetailsWithApplications()
        {
            List<proc_getAllCustDetailsAlongWithAppStatus_Result> result = null;
            result = entities.proc_getAllCustDetailsAlongWithAppStatus().ToList();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No customer registered");
            else
                return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
