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
    [EnableCors(origins: "http://localhost:4200",headers:"*",methods:"*")]

    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();

        public HttpResponseMessage UserLogin(tblLogin user)
        {
            proc_UserLogin_Result result = null;
            result = entities.proc_UserLogin(user.cust_id, user.pwd).FirstOrDefault();
            if (result == null )
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Username or Password");
            else
                return Request.CreateResponse<proc_UserLogin_Result>(result);
        }

        [HttpPut]
        public HttpResponseMessage Put(string id, tblLogin user)
        {
            DbContextTransaction transaction = entities.Database.BeginTransaction();
            try
            {
                tblLogin updateLogin = entities.tblLogin.Where(l=>l.acc_number==id).FirstOrDefault();
                updateLogin.pwd = user.pwd;
                entities.SaveChanges();

                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not update the table");
            }
            return Request.CreateResponse(HttpStatusCode.Accepted, user);
        }

        


        [Route("setBlocked")]
        [HttpPost]
        public HttpResponseMessage SetUserBlocked(tblBlocked blocked)
        {
            int? result = null;   
            result = entities.proc_InsBlocked(blocked.cust_id,blocked.acc_number);
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Blocked");
            else
                return Request.CreateResponse(result);
        }
    }
}
