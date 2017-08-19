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
     
    public class specialitiesController : ApiController
    {
        private hackathonDb1Entities1 db = new hackathonDb1Entities1();

        // GET: api/specialities
          
        public IQueryable<speciality> Getspecialities()
        {
            return db.specialities;
        }

        // GET: api/specialities/5
     
        
        public IHttpActionResult Getspeciality(int id)
        {
            speciality speciality = db.specialities.Find(id);
            if (speciality == null)
            {
                return NotFound();
            }

            return Ok(speciality);
        }

        // PUT: api/specialities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putspeciality(int id, speciality speciality)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != speciality.SpecialityID)
            {
                return BadRequest();
            }

            db.Entry(speciality).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!specialityExists(id))
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

        // POST: api/specialities
        [ResponseType(typeof(speciality))]
        public IHttpActionResult Postspeciality(speciality speciality)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.specialities.Add(speciality);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = speciality.SpecialityID }, speciality);
        }

        // DELETE: api/specialities/5
        [ResponseType(typeof(speciality))]
        public IHttpActionResult Deletespeciality(int id)
        {
            speciality speciality = db.specialities.Find(id);
            if (speciality == null)
            {
                return NotFound();
            }

            db.specialities.Remove(speciality);
            db.SaveChanges();

            return Ok(speciality);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool specialityExists(int id)
        {
            return db.specialities.Count(e => e.SpecialityID == id) > 0;
        }
    }
}