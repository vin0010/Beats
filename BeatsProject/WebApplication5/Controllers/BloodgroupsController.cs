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
    public class BloodgroupsController : ApiController
    {
        private hackathonDb1Entities1 db = new hackathonDb1Entities1();

        // GET: api/Bloodgroups
        public IQueryable<Bloodgroup> GetBloodgroups()
        {
            return db.Bloodgroups;
        }

        // GET: api/Bloodgroups/5
        [ResponseType(typeof(Bloodgroup))]
        public IHttpActionResult GetBloodgroup(int id)
        {
            Bloodgroup bloodgroup = db.Bloodgroups.Find(id);
            if (bloodgroup == null)
            {
                return NotFound();
            }

            return Ok(bloodgroup);
        }

        // PUT: api/Bloodgroups/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBloodgroup(int id, Bloodgroup bloodgroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bloodgroup.BloodgroupID)
            {
                return BadRequest();
            }

            db.Entry(bloodgroup).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BloodgroupExists(id))
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

        // POST: api/Bloodgroups
        [ResponseType(typeof(Bloodgroup))]
        public IHttpActionResult PostBloodgroup(Bloodgroup bloodgroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bloodgroups.Add(bloodgroup);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bloodgroup.BloodgroupID }, bloodgroup);
        }

        // DELETE: api/Bloodgroups/5
        [ResponseType(typeof(Bloodgroup))]
        public IHttpActionResult DeleteBloodgroup(int id)
        {
            Bloodgroup bloodgroup = db.Bloodgroups.Find(id);
            if (bloodgroup == null)
            {
                return NotFound();
            }

            db.Bloodgroups.Remove(bloodgroup);
            db.SaveChanges();

            return Ok(bloodgroup);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BloodgroupExists(int id)
        {
            return db.Bloodgroups.Count(e => e.BloodgroupID == id) > 0;
        }
    }
}