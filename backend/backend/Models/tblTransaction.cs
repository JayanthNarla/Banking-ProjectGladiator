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
    
    public partial class tblTransaction
    {
        public string transaction_id { get; set; }
        public string acc_number { get; set; }
        public string transaction_type { get; set; }
        public System.DateTime tran_date { get; set; }
        public string cred_acc { get; set; }
        public string deb_acc { get; set; }
        public string transac_amt { get; set; }
        public string deb_bal { get; set; }
        public string cred_bal { get; set; }
    
        public virtual tblAccounts tblAccounts { get; set; }
    }
}
