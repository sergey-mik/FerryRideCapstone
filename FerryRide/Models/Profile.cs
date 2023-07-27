using System;
using System.Collections.Generic;

namespace FerryRide.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int UserTypeId { get; set; }
    }
}
