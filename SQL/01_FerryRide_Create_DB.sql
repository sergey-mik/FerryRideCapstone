USE [master]

IF db_id('FerryRide') IS NULL
    CREATE DATABASE [FerryRide]
GO

USE [FerryRide]
GO

DROP TABLE IF EXISTS [SavedFerryDepartures];
DROP TABLE IF EXISTS [SeatReservation];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [TicketPurchase];
DROP TABLE IF EXISTS [FerrySchedule];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [UserType] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [FirebaseUserId] nvarchar(28) UNIQUE NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Email] nvarchar(255) NOT NULL,
    [CreateDateTime] datetime NOT NULL,
    [UserTypeId] int NOT NULL,
    CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
)
GO

CREATE TABLE [FerrySchedule] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Origin] nvarchar(255) NOT NULL,
    [Destination] nvarchar(255) NOT NULL,
    [Duration] int NOT NULL
)
GO

CREATE TABLE [TicketPurchase] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [UserProfileId] int NOT NULL,
    [FerryScheduleId] int NOT NULL,
    [DepartureDateTime] datetime NOT NULL,
    CONSTRAINT [FK_TicketPurchase_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES UserProfile([Id]),
    CONSTRAINT FK_TicketPurchase_FerrySchedule FOREIGN KEY (FerryScheduleId) REFERENCES FerrySchedule(Id)
)
GO

CREATE TABLE [Comment] (
    Id int PRIMARY KEY IDENTITY(1, 1),
    TicketPurchaseId int NOT NULL,
    Subject nvarchar(255) NOT NULL,
    Content nvarchar(MAX) NOT NULL,
    CreateDateTime datetime NOT NULL,
    CONSTRAINT FK_Comment_TicketPurchase FOREIGN KEY (TicketPurchaseId) REFERENCES TicketPurchase(Id)
)
GO

CREATE TABLE [SeatReservation] (
  Id int PRIMARY KEY IDENTITY(1, 1),
  TicketPurchaseId int NOT NULL,
  SeatRow int NOT NULL,
  SeatNumber int NOT NULL,
  CONSTRAINT FK_SeatReservation_TicketPurchase FOREIGN KEY (TicketPurchaseId) REFERENCES TicketPurchase(Id)
)
GO

CREATE TABLE [SavedFerryDepartures] (
  Id int PRIMARY KEY IDENTITY(1, 1),
  UserProfileId int NOT NULL,
  FerryScheduleId int NOT NULL,
  CONSTRAINT FK_SavedFerryDepartures_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id),
  CONSTRAINT FK_SavedFerryDepartures_FerrySchedule FOREIGN KEY (FerryScheduleId) REFERENCES FerrySchedule(Id)
)
GO
