using System;

namespace FerryRide.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDateTime { get; set; }
    }
}
