using System;

namespace FerryRide.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int TicketPurchaseId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string AuthorName { get; set; }
    }
}
