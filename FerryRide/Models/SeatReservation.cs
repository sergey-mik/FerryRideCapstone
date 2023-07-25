namespace FerryRide.Models
{
    public class SeatReservation
    {
        public int Id { get; set; }
        public int TicketPurchaseId { get; set; }
        public int SeatRow { get; set; }
        public int SeatNumber { get; set; }
        public int UserProfileId { get; set; }
        public int FerryScheduleId { get; set; }
    }
}
