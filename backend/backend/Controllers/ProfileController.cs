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
    public class ProfileController : ApiController
    {
        dbBankingEntities db = new dbBankingEntities();
        [HttpGet]
        public HttpResponseMessage userProfile(string id)
        {
            
            try
            {
                getallCustomers_Result result = null;
                result=db.getallCustomers(id).FirstOrDefault();
                if (result == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK,result);

            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        [HttpPut]
        public HttpResponseMessage userPut(tblCustomer tbl)
        {
            try
            {
                tblCustomer customer = new tblCustomer();
                customer = db.tblCustomer.Find(tbl.cust_id);
                if (customer != null)
                {
                    customer.title = tbl.title;
                    customer.last_name = tbl.last_name;
                    customer.age = tbl.age;
                    customer.res_address = tbl.res_address;
                    customer.perm_address = tbl.perm_address;
                }
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK,tbl);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            
        }
    }
}
