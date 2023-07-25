using System.ComponentModel.DataAnnotations;

namespace FerryRide.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int CUSTOMER_ID => 2;
    }
}