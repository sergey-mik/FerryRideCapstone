using System.Collections.Generic;
using FerryRide.Models;

namespace FerryRide.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
        void AddComment(Comment comment);
    }
}
