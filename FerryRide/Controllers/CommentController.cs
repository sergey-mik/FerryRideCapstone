using Microsoft.AspNetCore.Mvc;
using FerryRide.Models;
using System.Collections.Generic;
using FerryRide.Repositories;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Comment> comments = _commentRepository.GetAllComments();
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public IActionResult GetCommentsByTripId(int id)
        {
            List<Comment> comments = _commentRepository.GetCommentsByTripId(id);
            return Ok(comments);
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            _commentRepository.AddComment(comment);
            return CreatedAtAction(nameof(GetCommentsByTripId), new { id = comment.Id }, comment);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserComments(int userId)
        {
            List<Comment> comments = _commentRepository.GetUserComments(userId);
            return Ok(comments);
        }

        [HttpGet("ticket/{ticketPurchaseId}")]
        public IActionResult GetCommentsByTicketPurchaseId(int ticketPurchaseId)
        {
            List<Comment> comments = _commentRepository.GetCommentsByTicketPurchaseId(ticketPurchaseId);
            return Ok(comments);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.UpdateComment(comment);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }


    }
}
