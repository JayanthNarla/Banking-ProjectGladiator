//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace backend.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblInternetBanking
    {
        public string cust_id { get; set; }
        public string acc_number { get; set; }
        public string pwd { get; set; }
        public string Tpwd { get; set; }
    
        public virtual tblAccounts tblAccounts { get; set; }
    }
}
