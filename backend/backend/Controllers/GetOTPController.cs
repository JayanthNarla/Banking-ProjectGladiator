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
    

    public class otp
    {
        public string send_otp { get; set; }
        public string mail { get; set; }
    }
    public class mailIBDets
    {
        public string user_id { get; set; }
        public string acc_number { get; set; }
        public string pwd { get; set; }
        public string tpwd { get; set; }

    }
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]


    [RoutePrefix("api/GetOTP")]
    public class GetOTPController : ApiController
    {

        dbBankingEntities entities = new dbBankingEntities();
        [HttpPost]
        [Route("genOtp")]
        public string GenerateOTP(otp otp)
        {

            MailAddress to = new MailAddress(otp.mail);
            MailAddress from = new MailAddress("projectgladiatorbanking@gmail.com");

            MailMessage message = new MailMessage(from, to);
            message.Subject = "Recover/Reset Your Account/Password";
            message.Body = "Otp for authenticating is: \n\n"+otp.send_otp+"\n\n thank you";

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
        [Route("sendIBDets")]
        public string sendIBDets(mailIBDets iBDets)
        {
            proc_verifyMailByAccNum_Result result = entities.proc_verifyMailByAccNum(iBDets.acc_number).FirstOrDefault();

                MailAddress to = new MailAddress(result.cust_mail);
                MailAddress from = new MailAddress("projectgladiatorbanking@gmail.com");

                MailMessage message = new MailMessage(from, to);
                message.Subject = "Internet Banking Details";
                message.Body = "Credentials for Internet Banking are: \n\nLogin User ID: " + iBDets.user_id + "\n\nThank You";

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
        [Route("verifyMail")]
        public HttpResponseMessage verifyMail(tblCustomer cust)
        {
            proc_verifyMail_Result result = null;
            result = entities.proc_verifyMail(cust.cust_id).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Customer ID Incorrect");
            else
                return Request.CreateResponse<proc_verifyMail_Result>(result);
        }


        [HttpPost]
        [Route("verifyMailByAccNum")]
        public HttpResponseMessage verifyMailByAccNum(tblAccounts acc)
        {
            proc_verifyMailByAccNum_Result result = null;
            result = entities.proc_verifyMailByAccNum(acc.acc_number).FirstOrDefault();
            if (result == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Mail ID Incorrect");
            else
                return Request.CreateResponse<proc_verifyMailByAccNum_Result>(result);
        }
    }
}
