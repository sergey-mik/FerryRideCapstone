using FerryRide.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FerryRide.Models;
using System;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketPurchaseController : ControllerBase
    {
        private ITicketPurchaseRepository _ticketPurchaseRepository;

        public TicketPurchaseController(ITicketPurchaseRepository ticketPurchaseRepository)
        {
            _ticketPurchaseRepository = ticketPurchaseRepository;
        }

        // GET: api/TicketPurchase
        [HttpGet]
        public IActionResult GetTicketPurchase() 
        {
            var ticketPurchase = _ticketPurchaseRepository.GetTicketPurchase();
            return Ok(ticketPurchase);
        }

        // POST: api/TicketPurchase
        [HttpPost]
        public IActionResult PostTicketPurchase([FromBody] TicketPurchase newReservation)
        {
            // Convert DepartureDateTime from UTC to server's local time
            DateTime departureDateTimeUtc = DateTime.SpecifyKind(newReservation.DepartureDateTime, DateTimeKind.Utc);
            DateTime departureDateTimeLocal = departureDateTimeUtc.ToLocalTime();

            // Update newReservation with the local time
            newReservation.DepartureDateTime = departureDateTimeLocal;

            // Pass the updated newReservation to the repository to create the ticket purchase
            var createdReservation = _ticketPurchaseRepository.CreateTicketPurchase(newReservation);
            return Ok(createdReservation);
        }

    }
}
