using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public class ProfileRepository : BaseRepository
    {
        public ProfileRepository(IConfiguration config) : base(config) { }

        public Profile GetProfileByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id, up.FirstName, up.LastName, up.Email, ut.Name AS UserTypeName
                    FROM UserProfile up
                    JOIN UserType ut ON up.UserTypeId = ut.Id
                    WHERE up.FirebaseUserId = @FirebaseUserId";
                    cmd.Parameters.AddWithValue("@FirebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        var profile = new Profile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeName = DbUtils.GetString(reader, "UserTypeName")
                        };
                        reader.Close();

                        // Get upcoming trips
                        profile.UpcomingTrips = new List<Trip>();
                        cmd.CommandText = @"
                        SELECT tp.Id, fs.Origin, fs.Destination, tp.DepartureDateTime
                        FROM TicketPurchase tp
                        JOIN FerrySchedule fs ON tp.FerryScheduleId = fs.Id
                        WHERE tp.UserProfileId = @UserProfileId AND tp.DepartureDateTime > GETDATE()
                        ORDER BY tp.DepartureDateTime";
                        cmd.Parameters.AddWithValue("@UserProfileId", profile.Id);

                        reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            var trip = new Trip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Destination = DbUtils.GetString(reader, "Destination"),
                                DepartureDateTime = DbUtils.GetDateTime(reader, "DepartureDateTime")
                            };
                            profile.UpcomingTrips.Add(trip);
                        }
                        reader.Close();

                        // Get trip history
                        profile.TripHistory = new List<Trip>();
                        cmd.CommandText = @"
                        SELECT tp.Id, fs.Origin, fs.Destination, tp.DepartureDateTime
                        FROM TicketPurchase tp
                        JOIN FerrySchedule fs ON tp.FerryScheduleId = fs.Id
                        WHERE tp.UserProfileId = @UserProfileId AND tp.DepartureDateTime <= GETDATE()
                        ORDER BY tp.DepartureDateTime DESC";
                        cmd.Parameters.AddWithValue("@UserProfileId", profile.Id);

                        reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            var trip = new Trip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Destination = DbUtils.GetString(reader, "Destination"),
                                DepartureDateTime = DbUtils.GetDateTime(reader, "DepartureDateTime")
                            };
                            profile.TripHistory.Add(trip);
                        }
                        reader.Close();

                        // Get saved trips
                        profile.SavedTrips = new List<SavedTrip>();
                        cmd.CommandText = @"
                        SELECT sfd.Id, fs.Origin, fs.Destination
                        FROM SavedFerryDepartures sfd
                        JOIN FerrySchedule fs ON sfd.FerryScheduleId = fs.Id
                        WHERE sfd.UserProfileId = @UserProfileId";
                        cmd.Parameters.AddWithValue("@UserProfileId", profile.Id);

                        reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            var savedTrip = new SavedTrip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Destination = DbUtils.GetString(reader, "Destination")
                            };
                            profile.SavedTrips.Add(savedTrip);
                        }
                        reader.Close();

                        return profile;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }

}
