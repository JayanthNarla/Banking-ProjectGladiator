using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using backend.Models;

using System.Net.Mail;

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
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
        }


        public string sendAccNum(string cid, string mail)
        {

            MailAddress to = new MailAddress(mail);
            MailAddress from = new MailAddress("projectgladiatorbanking@gmail.com");

            MailMessage message = new MailMessage(from, to);
            message.Subject = "Internet Banking Details";
            message.Body = "Your Customer ID for Login is\n" + cid +"\nThank You";

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("projectgladiatorbanking@gmail.com", "Qwerty!23"),
                EnableSsl = true
            };


            try
            {
                client.Send(message);
                return "Done";
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
                return "sorry";
            }


        }

        [HttpPost]
        [Route("api/CustStatus/forgotUid")]
        public HttpResponseMessage forgotUid(tblLogin pDets)
        {
            var custid = db.tblAccounts.Where(c => c.acc_number == pDets.acc_number).FirstOrDefault().cust_id;
            var cust_id_tosend = db.tblLogin.Where(c => c.acc_number == pDets.acc_number).FirstOrDefault().cust_id;
            var toMail = db.tblCustomer.Where(c => c.cust_id == custid).FirstOrDefault().cust_mail;
            if (custid == null) {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "not sent");
            }
            else
            {
                sendAccNum(cust_id_tosend, toMail);
                return Request.CreateResponse(HttpStatusCode.OK, "sent");
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
