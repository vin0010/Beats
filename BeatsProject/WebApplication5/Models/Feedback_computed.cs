//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication5.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Feedback_computed
    {
        public int ComputedId { get; set; }
        public Nullable<int> DoctorId { get; set; }
        public Nullable<double> Quality { get; set; }
        public Nullable<double> Waiting { get; set; }
        public Nullable<double> Infrastructure { get; set; }
        public Nullable<double> OverallScore { get; set; }
    }
}
