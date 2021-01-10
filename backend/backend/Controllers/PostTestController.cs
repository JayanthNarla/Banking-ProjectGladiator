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
    public class PostTestController : ApiController
    {
        dbBankingEntities db = new dbBankingEntities();
        [HttpPost]
        public HttpResponseMessage register(tblInternetBanking tbl)
        {
            try
            {
                db.proc_Internet_login(tbl.cust_id, tbl.acc_number, tbl.pwd, tbl.Tpwd);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, tbl);
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,"bbb");
            }
            
        }
    }
}
