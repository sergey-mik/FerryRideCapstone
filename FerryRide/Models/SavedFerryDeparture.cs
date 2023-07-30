namespace FerryRide.Models
{
    public class SavedFerryDeparture
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int FerryScheduleId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
    }
}
