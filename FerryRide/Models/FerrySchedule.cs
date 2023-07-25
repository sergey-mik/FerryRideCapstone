using System;

namespace FerryRide.Models
{
    public class FerrySchedule
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public int Duration { get; set; }
    }
}
