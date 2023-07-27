using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public class ProfileRepository : BaseRepository, IProfileRepository
    {
        public ProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<Trip> GetTripHistory(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT tp.Id, fs.Origin, fs.Destination, tp.DepartureDateTime
                            FROM TicketPurchase tp
                            JOIN FerrySchedule fs ON tp.FerryScheduleId = fs.Id
                            WHERE tp.UserProfileId = @UserProfileId
                            ORDER BY tp.DepartureDateTime DESC";
                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        var tripHistory = new List<Trip>();

                        while (reader.Read())
                        {
                            tripHistory.Add(new Trip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Destination = DbUtils.GetString(reader, "Destination"),
                                DepartureDateTime = DbUtils.GetDateTime(reader, "DepartureDateTime")
                            });
                        }

                        return tripHistory;
                    }
                }
            }
        }

        public int GetUserProfileIdByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id FROM UserProfile WHERE FirebaseUserId = @FirebaseUserId";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        int userProfileId = 0;
                        if (reader.Read())
                        {
                            userProfileId = DbUtils.GetInt(reader, "Id");
                        }
                        return userProfileId;
                    }
                }
            }
        }
    }

}

