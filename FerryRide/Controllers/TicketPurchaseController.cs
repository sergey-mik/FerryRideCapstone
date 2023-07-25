using FerryRide.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FerryRide.Models;

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
            var createdReservation = _ticketPurchaseRepository.CreateTicketPurchase(newReservation);
            return Ok(createdReservation);
        }
    }
}
