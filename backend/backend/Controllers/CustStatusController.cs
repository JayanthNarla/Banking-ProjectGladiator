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
    public class CustStatusController : ApiController
    {
        dbBankingEntities db = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage custstatus(tblCustomer tbl)
        {
            try
            {
                db.proc_UserReg(tbl.aadhar,tbl.cust_id,tbl.title,tbl.first_name,tbl.middle_name,tbl.last_name,tbl.father_name,tbl.phone,tbl.cust_mail,tbl.dob,tbl.age,
                    tbl.res_address,tbl.perm_address,tbl.gender);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
        }
        [HttpGet]
        public HttpResponseMessage status_by_id(string id)
        {
            try
            {
                proc_getStatusbyId_Result result = null;
                
                result = db.proc_getStatusbyId(id).FirstOrDefault();
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK,result);

                }
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
       
    }
}
