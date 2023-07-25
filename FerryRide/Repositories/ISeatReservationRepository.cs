using FerryRide.Models;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public interface ISeatReservationRepository
    {
        IEnumerable<SeatReservation> GetSeatReservations();
        SeatReservation CreateSeatReservation(SeatReservation newReservation, TicketPurchase newTicketPurchase);
    }

}
