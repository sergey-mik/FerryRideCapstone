using FerryRide.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FerryRide.Models;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatReservationController : ControllerBase
    {
        private ISeatReservationRepository _seatReservationRepository;
        private ITicketPurchaseRepository _ticketPurchaseRepository;

        public SeatReservationController(ISeatReservationRepository seatReservationRepository, ITicketPurchaseRepository ticketPurchaseRepository)
        {
            _seatReservationRepository = seatReservationRepository;
            _ticketPurchaseRepository = ticketPurchaseRepository;
        }

        // GET: api/SeatReservation
        [HttpGet]
        public IActionResult GetSeatReservations()
        {
            var seatReservations = _seatReservationRepository.GetSeatReservations();
            return Ok(seatReservations);
        }

        // POST: api/SeatReservation
        [HttpPost]
        public IActionResult CreateSeatReservation([FromBody] SeatReservation newReservation, [FromQuery] int ticketPurchaseId)
        {
            var newTicketPurchase = _ticketPurchaseRepository.GetTicketPurchaseById(ticketPurchaseId);
            var createdReservation = _seatReservationRepository.CreateSeatReservation(newReservation, newTicketPurchase);
            return Ok(createdReservation);
        }
    }
}