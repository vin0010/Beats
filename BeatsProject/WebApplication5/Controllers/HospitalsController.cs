using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    public class HospitalsController : ApiController
    {
        private hackathonDb1Entities1 db = new hackathonDb1Entities1();

        // GET: api/Hospitals
        public IQueryable<Hospital> GetHospitals()
        {
            return db.Hospitals;
        }

        // GET: api/Hospitals/5
        [ResponseType(typeof(Hospital))]
        public IHttpActionResult GetHospital(int id)
        {
            Hospital hospital = db.Hospitals.Find(id);
            if (hospital == null)
            {
                return NotFound();
            }

            return Ok(hospital);
        }

        // PUT: api/Hospitals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHospital(int id, Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hospital.HospitalId)
            {
                return BadRequest();
            }

            db.Entry(hospital).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(id))
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

        // POST: api/Hospitals
        [ResponseType(typeof(Hospital))]
        public IHttpActionResult PostHospital(Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Hospitals.Add(hospital);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = hospital.HospitalId }, hospital);
        }

        // DELETE: api/Hospitals/5
        [ResponseType(typeof(Hospital))]
        public IHttpActionResult DeleteHospital(int id)
        {
            Hospital hospital = db.Hospitals.Find(id);
            if (hospital == null)
            {
                return NotFound();
            }

            db.Hospitals.Remove(hospital);
            db.SaveChanges();

            return Ok(hospital);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HospitalExists(int id)
        {
            return db.Hospitals.Count(e => e.HospitalId == id) > 0;
        }
    }
}