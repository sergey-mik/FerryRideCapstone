using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public class SavedFerryDepartureRepository : BaseRepository, ISavedFerryDepartureRepository
    {
        public SavedFerryDepartureRepository(IConfiguration configuration) : base(configuration) { }

        public List<SavedFerryDeparture> GetSavedDepartures()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT sd.Id, sd.UserProfileId, sd.FerryScheduleId, fs.Origin, fs.Destination
                FROM SavedFerryDepartures sd
                JOIN FerrySchedule fs ON sd.FerryScheduleId = fs.Id";

                    var reader = cmd.ExecuteReader();
                    var savedDepartures = new List<SavedFerryDeparture>();

                    while (reader.Read())
                    {
                        savedDepartures.Add(new SavedFerryDeparture
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FerryScheduleId = DbUtils.GetInt(reader, "FerryScheduleId"),
                            Origin = DbUtils.GetString(reader, "Origin"),
                            Destination = DbUtils.GetString(reader, "Destination"),
                        });
                    }
                    reader.Close();
                    return savedDepartures;
                }
            }
        }

        public SavedFerryDeparture SaveDeparture(SavedFerryDeparture newDeparture)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO SavedFerryDepartures (UserProfileId, FerryScheduleId) 
                OUTPUT INSERTED.ID
                VALUES (@UserProfileId, @FerryScheduleId)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", newDeparture.UserProfileId);
                    DbUtils.AddParameter(cmd, "@FerryScheduleId", newDeparture.FerryScheduleId);

                    newDeparture.Id = (int)cmd.ExecuteScalar();
                }
            }
            return newDeparture;
        }

        public void DeleteDeparture(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM SavedFerryDepartures WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
