using FerryRide.Models;
using FerryRide.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FerryScheduleController : ControllerBase
    {
        private IFerryScheduleRepository _ferryScheduleRepository;

        public FerryScheduleController(IFerryScheduleRepository ferryScheduleRepository)
        {
            _ferryScheduleRepository = ferryScheduleRepository;
        }

        [HttpGet]
        public IActionResult GetFerrySchedules()
        {
            var ferrySchedules = _ferryScheduleRepository.GetFerrySchedules();
            return Ok(ferrySchedules);
        }

        [HttpPost]
        public IActionResult CreateFerrySchedule([FromBody] FerrySchedule newSchedule)
        {
            var createdSchedule = _ferryScheduleRepository.CreateFerrySchedule(newSchedule);
            return Ok(createdSchedule);
        }
    }

}
