using FerryRide.Models;
using FerryRide.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT c.Id, c.TicketPurchaseId, c.Subject, c.Content, c.CreateDateTime,
                       u.FirstName + ' ' + u.LastName AS AuthorName,
                       fs.Id AS FerryScheduleId, fs.Origin AS DeparturePortName, fs.Destination AS ArrivalPortName
                FROM Comment c
                JOIN TicketPurchase tp ON c.TicketPurchaseId = tp.Id
                JOIN UserProfile u ON tp.UserProfileId = u.Id
                JOIN FerrySchedule fs ON tp.FerryScheduleId = fs.Id
            ";

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TicketPurchaseId = DbUtils.GetInt(reader, "TicketPurchaseId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            AuthorName = DbUtils.GetString(reader, "AuthorName"),
                            FerryScheduleId = DbUtils.GetInt(reader, "FerryScheduleId"),
                            DeparturePortName = DbUtils.GetString(reader, "DeparturePortName"),
                            ArrivalPortName = DbUtils.GetString(reader, "ArrivalPortName")
                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public List<Comment> GetCommentsByTripId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT c.Id, c.TicketPurchaseId, c.Subject, c.Content, c.CreateDateTime
                FROM Comment c
                WHERE c.TicketPurchaseId = @id
            ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TicketPurchaseId = DbUtils.GetInt(reader, "TicketPurchaseId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (TicketPurchaseId, Subject, Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@ticketPurchaseId, @subject, @content, @createDateTime)
                    ";
                    DbUtils.AddParameter(cmd, "@ticketPurchaseId", comment.TicketPurchaseId);
                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Comment> GetUserComments(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT c.Id, c.TicketPurchaseId, c.Subject, c.Content, c.CreateDateTime
                FROM Comment c
                JOIN TicketPurchase tp ON c.TicketPurchaseId = tp.Id
                WHERE tp.UserProfileId = @userProfileId
            ";
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TicketPurchaseId = DbUtils.GetInt(reader, "TicketPurchaseId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public List<Comment> GetCommentsByTicketPurchaseId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT c.Id, c.TicketPurchaseId, c.Subject, c.Content, c.CreateDateTime
                FROM Comment c
                WHERE c.TicketPurchaseId = @id
            ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TicketPurchaseId = DbUtils.GetInt(reader, "TicketPurchaseId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Comment 
                    SET
                        TicketPurchaseId = @TicketPurchaseId,
                        Subject = @Subject,
                        Content = @Content,
                        CreateDateTime = @CreateDateTime
                    WHERE Id = @Id
                ";

                    DbUtils.AddParameter(cmd, "@TicketPurchaseId", comment.TicketPurchaseId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}