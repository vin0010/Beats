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
    public class Feedback_computedController : ApiController
    {
        private hackathonDb1Entities1 db = new hackathonDb1Entities1();

        // GET: api/Feedback_computed
        public IQueryable<Feedback_computed> GetFeedback_computed()
        {
            return db.Feedback_computed;
        }

        // GET: api/Feedback_computed/5
        [ResponseType(typeof(Feedback_computed))]
        public IHttpActionResult GetFeedback_computed(int id)
        {
            Feedback_computed feedback_computed = db.Feedback_computed.Find(id);
            if (feedback_computed == null)
            {
                return NotFound();
            }

            return Ok(feedback_computed);
        }


        // PUT: api/Feedback_computed/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFeedback_computed(int id, Feedback_computed feedback_computed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != feedback_computed.ComputedId)
            {
                return BadRequest();
            }

            db.Entry(feedback_computed).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Feedback_computedExists(id))
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

        // PUT: api/Feedback_computed/5
        //[ResponseType(typeof(void))]
        //public void UpdateFeedback_computed(int id, Feedback feedback)
        //{
        //var query = db.Feedback_computed

        //     db.SaveChanges();
        //}
        // POST: api/Feedback_computed
        [ResponseType(typeof(Feedback_computed))]
        public IHttpActionResult PostFeedback_computed(Feedback_computed feedback_computed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Feedback_computed.Add(feedback_computed);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = feedback_computed.ComputedId }, feedback_computed);
        }

        // DELETE: api/Feedback_computed/5
        [ResponseType(typeof(Feedback_computed))]
        public IHttpActionResult DeleteFeedback_computed(int id)
        {
            Feedback_computed feedback_computed = db.Feedback_computed.Find(id);
            if (feedback_computed == null)
            {
                return NotFound();
            }

            db.Feedback_computed.Remove(feedback_computed);
            db.SaveChanges();

            return Ok(feedback_computed);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Feedback_computedExists(int id)
        {
            return db.Feedback_computed.Count(e => e.ComputedId == id) > 0;
        }
    }
}