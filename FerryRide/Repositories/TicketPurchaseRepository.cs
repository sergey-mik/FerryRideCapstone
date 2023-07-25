using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;

namespace FerryRide.Repositories
{
    public class TicketPurchaseRepository : BaseRepository, ITicketPurchaseRepository
    {
        public TicketPurchaseRepository(IConfiguration configuration) : base(configuration) { }

        public TicketPurchase GetTicketPurchaseById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, FerryScheduleId, DepartureDateTime
                                FROM TicketPurchase
                                WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new TicketPurchase()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FerryScheduleId = DbUtils.GetInt(reader, "FerryScheduleId"),
                            DepartureDateTime = DbUtils.GetDateTime(reader, "DepartureDateTime")
                        };
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        public IEnumerable<TicketPurchase> GetTicketPurchase()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, FerryScheduleId, DepartureDateTime
                                FROM TicketPurchase";

                    var reader = cmd.ExecuteReader();

                    var ticketPurchases = new List<TicketPurchase>();
                    while (reader.Read())
                    {
                        ticketPurchases.Add(new TicketPurchase()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FerryScheduleId = DbUtils.GetInt(reader, "FerryScheduleId"),
                            DepartureDateTime = DbUtils.GetDateTime(reader, "DepartureDateTime")
                        });
                    }

                    return ticketPurchases;
                }
            }
        }

        public TicketPurchase CreateTicketPurchase(TicketPurchase newReservation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO TicketPurchase (UserProfileId, FerryScheduleId, DepartureDateTime)
                                OUTPUT INSERTED.ID
                                VALUES (@UserProfileId, @FerryScheduleId, @DepartureDateTime)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", newReservation.UserProfileId);
                    DbUtils.AddParameter(cmd, "@FerryScheduleId", newReservation.FerryScheduleId);
                    DbUtils.AddParameter(cmd, "@DepartureDateTime", newReservation.DepartureDateTime);

                    newReservation.Id = (int)cmd.ExecuteScalar();
                }
            }

            return newReservation;
        }

    }
}
