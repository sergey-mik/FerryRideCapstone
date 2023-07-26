using System.Collections.Generic;

namespace FerryRide.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserTypeName { get; set; }
        public List<Trip> UpcomingTrips { get; set; }
        public List<Trip> TripHistory { get; set; }
        public List<SavedTrip> SavedTrips { get; set; }
    }
}
