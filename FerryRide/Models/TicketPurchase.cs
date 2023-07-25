using System;

namespace FerryRide.Models
{
    public class TicketPurchase
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int FerryScheduleId { get; set; }
        public DateTime DepartureDateTime { get; set; }
    }
}
