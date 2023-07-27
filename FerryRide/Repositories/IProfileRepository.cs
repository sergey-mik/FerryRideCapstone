using FerryRide.Models;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public interface IProfileRepository
    {
        List<Trip> GetTripHistory(int userProfileId);
        int GetUserProfileIdByFirebaseUserId(string firebaseUserId);
    }
}
