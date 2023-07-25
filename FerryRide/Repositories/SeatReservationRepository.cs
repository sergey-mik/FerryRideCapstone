using FerryRide.Utils;
using FerryRide.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.Common;

namespace FerryRide.Repositories
{
    public class SeatReservationRepository : BaseRepository, ISeatReservationRepository
    {
        public SeatReservationRepository(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<SeatReservation> GetSeatReservations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, TicketPurchaseId, SeatRow, SeatNumber FROM SeatReservation";

                    var reader = cmd.ExecuteReader();
                    var seatReservations = new List<SeatReservation>();

                    while (reader.Read())
                    {
                        seatReservations.Add(new SeatReservation
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TicketPurchaseId = DbUtils.GetInt(reader, "TicketPurchaseId"),
                            SeatRow = DbUtils.GetInt(reader, "SeatRow"),
                            SeatNumber = DbUtils.GetInt(reader, "SeatNumber"),
                        });
                    }
                    reader.Close();
                    return seatReservations;
                }
            }
        }

        public SeatReservation CreateSeatReservation(SeatReservation newReservation, TicketPurchase newTicketPurchase)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO SeatReservation (TicketPurchaseId, SeatRow, SeatNumber)
                                OUTPUT INSERTED.ID
                                VALUES (@TicketPurchaseId, @SeatRow, @SeatNumber)";
                    DbUtils.AddParameter(cmd, "@TicketPurchaseId", newTicketPurchase.Id);
                    DbUtils.AddParameter(cmd, "@SeatRow", newReservation.SeatRow);
                    DbUtils.AddParameter(cmd, "@SeatNumber", newReservation.SeatNumber);

                    newReservation.Id = (int)cmd.ExecuteScalar();
                }
            }

            return newReservation;
        }

    }
}
