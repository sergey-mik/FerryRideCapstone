﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FerryRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Home()
        {
            return Content("hello");
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult HelloAuth()
        {
            return Content("hello from an endpoint that requires auth");
        }
    }
}
