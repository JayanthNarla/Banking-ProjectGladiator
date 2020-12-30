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
    [EnableCors(origins: "http://localhost:4200",headers:"*",methods:"*")]

    
    public class LoginController : ApiController
    {
        dbBankingEntities entities = new dbBankingEntities();

        public HttpResponseMessage UserLogin(tblLogin user)
        {
            proc_UserLogin_Result result = null;
            result = entities.proc_UserLogin(user.cust_id, user.pwd).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Username or Password");
            else
                return Request.CreateResponse<proc_UserLogin_Result>(result);
        }
    }
}
