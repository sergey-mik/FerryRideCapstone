USE [FerryRide];
GO

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'Client');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [CreateDateTime], [UserTypeId])
VALUES (1, 'wSnEKbNMh1OENcFX5f6w7CjAkUz1', 'Joshua', 'Shaw', 'admin@google.com', '2020-04-23', 1),
       (2, 'gCoabJPhTib3ZJTBG7IslZlTVOm1', 'Bentlee', 'Chen', 'client@google.com', '2020-04-20', 2);
SET IDENTITY_INSERT [UserProfile] OFF

INSERT INTO FerrySchedule (Origin, Destination, Duration)
VALUES 
('Edgewater Landing', 'Port Imperial', 90),
('Port Imperial', 'Edgewater Landing', 90),
('Port Imperial', 'Lincoln Harbor', 90),
('Lincoln Harbor', 'Port Imperial', 90),
('Port Imperial', 'Paulus Hook', 90),
('Paulus Hook', 'Port Imperial', 90),
('Lincoln Harbor', 'Edgewater Landing', 90),
('Edgewater Landing', 'Lincoln Harbor', 90),
('Lincoln Harbor', 'Paulus Hook', 90),
('Paulus Hook', 'Lincoln Harbor', 90),
('Edgewater Landing', 'Paulus Hook', 90),
('Paulus Hook', 'Edgewater Landing', 90);
