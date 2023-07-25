using FerryRide.Models;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public interface ITicketPurchaseRepository
    {
        IEnumerable<TicketPurchase> GetTicketPurchase();
        TicketPurchase CreateTicketPurchase(TicketPurchase newReservation);
        TicketPurchase GetTicketPurchaseById(int id);
    }
}
