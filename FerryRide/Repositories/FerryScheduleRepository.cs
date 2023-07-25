using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public class FerryScheduleRepository : BaseRepository, IFerryScheduleRepository
    {
        public FerryScheduleRepository(IConfiguration configuration) : base(configuration) { }

        public List<FerrySchedule> GetFerrySchedules()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Origin, Destination, Duration FROM FerrySchedule";

                    var reader = cmd.ExecuteReader();
                    var ferrySchedules = new List<FerrySchedule>();

                    while (reader.Read())
                    {
                        ferrySchedules.Add(new FerrySchedule
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Origin = DbUtils.GetString(reader, "Origin"),
                            Destination = DbUtils.GetString(reader, "Destination"),
                            Duration = DbUtils.GetInt(reader, "Duration"),
                        });
                    }
                    reader.Close();
                    return ferrySchedules;
                }
            }
        }

        public FerrySchedule CreateFerrySchedule(FerrySchedule newSchedule)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO FerrySchedule (Origin, Destination, Duration) 
                    OUTPUT INSERTED.ID
                    VALUES (@Origin, @Destination, @Duration)";
                    DbUtils.AddParameter(cmd, "@Origin", newSchedule.Origin);
                    DbUtils.AddParameter(cmd, "@Destination", newSchedule.Destination);
                    DbUtils.AddParameter(cmd, "@Duration", newSchedule.Duration);

                    newSchedule.Id = (int)cmd.ExecuteScalar();

                }
            }
            return newSchedule;
        }
    }

}
