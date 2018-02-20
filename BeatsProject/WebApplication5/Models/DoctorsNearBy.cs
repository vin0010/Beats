using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication5.Models
{
    public class DoctorsNearBy
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public Nullable<double> latitude { get; set; }
        public Nullable<double> longitude { get; set; }
        public Nullable<int> HospitalId { get; set; }
        public Nullable<int> HospitalName { get; set; }
        public Nullable<int> Score { get; set; }

    }
}