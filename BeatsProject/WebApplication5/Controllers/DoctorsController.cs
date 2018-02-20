using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    
    public class DoctorsController : ApiController
    {
        private hackathonDb1Entities1 db = new hackathonDb1Entities1();

        // GET: api/Doctors
        public IQueryable<Doctor> GetDoctors()
        {
            return db.Doctors;
        }

        public IQueryable GetDoctorsforFeedback(int patientId)
        {
            //return db.Doctors;
            var qry = from b in db.Patients
                join f in db.Appointments on b.PatientId equals f.PatientId
                join g in db.Doctors on f.DoctorId equals g.DoctorId                 
                select new {g.DoctorId , g.DoctorName};

            return qry;
        }
        // GET: api/Doctors/5
        [ResponseType(typeof(Doctor))]
        public IHttpActionResult GetDoctor(int id)
        {
            Doctor doctor = db.Doctors.Find(id);
            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        // GET: api/Doctors/5
       // [ResponseType(typeof(Doctor))]
        public IHttpActionResult PostDoctorsNearby(HeadersDoctors id)
        {
            //List<Doctor> DoctorbySpeciality= db.Doctors.Where(y => y.SpecialityID == Specialityid).ToList();
            int median = 2;
            //  float Source_Latitude=10;
            //   float Source_Longitude=20;
            float Max_X = id.Source_Latitude + median;
            float Max_Y = id.Source_Longitude + median;
            float Min_X = id.Source_Latitude - median;
            float Min_Y = id.Source_Longitude - median;

            var qry = from b in db.Doctors
                    .Where(
                        y =>
                            y.SpecialityID == id.Specialityid && y.latitude <= Max_X && y.latitude >= Min_X &&
                            y.longitude <= Max_Y && y.longitude >= Min_Y)
                join f in db.Hospitals on b.HospitalId equals f.HospitalId
                join d in db.Feedback_computed on b.DoctorId equals d.DoctorId
                select new { b.DoctorId, b.DoctorName, b.latitude, b.longitude, b.HospitalId, f.HospitalName, d.OverallScore };

            return CreatedAtRoute("DefaultApi", new { id = qry }, qry); ;


        }

        // PUT: api/Doctors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDoctor(int id, Doctor doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != doctor.DoctorId)
            {
                return BadRequest();
            }

            db.Entry(doctor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Doctors
        [ResponseType(typeof(Doctor))]
        public IHttpActionResult PostDoctor(Doctor doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Doctors.Add(doctor);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = doctor.DoctorId }, doctor);
        }

        // DELETE: api/Doctors/5
        [ResponseType(typeof(Doctor))]
        public IHttpActionResult DeleteDoctor(int id)
        {
            Doctor doctor = db.Doctors.Find(id);
            if (doctor == null)
            {
                return NotFound();
            }

            db.Doctors.Remove(doctor);
            db.SaveChanges();

            return Ok(doctor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DoctorExists(int id)
        {
            return db.Doctors.Count(e => e.DoctorId == id) > 0;
        }

      
    }
}