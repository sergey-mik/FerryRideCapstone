using System.Collections.Generic;
using FerryRide.Models;

namespace FerryRide.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByTripId(int id);
        void AddComment(Comment comment);
        void UpdateComment(Comment comment);
        List<Comment> GetUserComments(int userId);
        List<Comment> GetCommentsByTicketPurchaseId(int ticketPurchaseId);
        void DeleteComment(int id);
    }
}
