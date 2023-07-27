using FerryRide.Models;
using FerryRide.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileController(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        [HttpGet("GetUserProfileId/{firebaseUserId}")]
        public IActionResult GetUserProfileId(string firebaseUserId)
        {
            var userProfileId = _profileRepository.GetUserProfileIdByFirebaseUserId(firebaseUserId);
            if (userProfileId == 0)
            {
                return NotFound();
            }
            return Ok(userProfileId);
        }

        [HttpGet("{userProfileId}")]
        public IActionResult GetTripHistory(int userProfileId)
        {
            var tripHistory = _profileRepository.GetTripHistory(userProfileId);
            return Ok(tripHistory);
        }
    }


}
