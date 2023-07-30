using FerryRide.Repositories;
using Microsoft.AspNetCore.Mvc;
using FerryRide.Models;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedFerryDepartureController : ControllerBase
    {
        private ISavedFerryDepartureRepository _savedFerryDepartureRepository;

        public SavedFerryDepartureController(ISavedFerryDepartureRepository savedFerryDepartureRepository)
        {
            _savedFerryDepartureRepository = savedFerryDepartureRepository;
        }

        [HttpPost]
        public IActionResult SaveDeparture([FromBody] SavedFerryDeparture newDeparture)
        {
            var savedDeparture = _savedFerryDepartureRepository.SaveDeparture(newDeparture);
            return Ok(savedDeparture);
        }

        [HttpGet]
        public IActionResult GetSavedDepartures()
        {
            var schedules = _savedFerryDepartureRepository.GetSavedDepartures();
            return Ok(schedules);
        }

    }
}
