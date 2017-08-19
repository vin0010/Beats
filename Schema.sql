use  hackathonDb1
go
create table patient
(
patientid [int] not null identity(1, 1) ,
patientname varchar(max),
gender char(1),
age int,
latitude decimal(38,8),
longitude decimal(38,8),
bloodgroup char(4)
);

alter table [dbo].[patient] add constraint [pk_patient] primary key clustered  ([patientid]) on [primary]
go

create table Doctor
(
DoctorId [int] NOT NULL IDENTITY(1, 1) ,
DoctorName varchar(max),
Gender char(1),
Age int,
latitude decimal(38,8),
longitude decimal(38,8),
SpecialityID int,
HospitalId [int]
);

ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [PK_Doctor] PRIMARY KEY CLUSTERED  ([DoctorId]) ON [PRIMARY]
GO

Create table speciality (
SpecialityID int NOT NULL IDENTITY(1, 1) ,
Specialityname VARCHAR(max),
)

ALTER TABLE [dbo].[speciality] ADD CONSTRAINT [PK_speciality] PRIMARY KEY CLUSTERED  ([specialityId]) ON [PRIMARY]
GO

create table Hospital
(
HospitalId [int] NOT NULL IDENTITY(1, 1) ,
HospitalName varchar(max),
latitude decimal(38,8),
longitude decimal(38,8)
);

ALTER TABLE [dbo].[Hospital] ADD CONSTRAINT [PK_Hospital] PRIMARY KEY CLUSTERED  ([HospitalId]) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [FK_Doctor_Hospitalid]FOREIGN KEY    ([HospitalId]) REFERENCES [dbo].[Hospital] ([HospitalId])
GO

ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [FK_Doctor_SpecialityID]FOREIGN KEY    ([SpecialityID]) REFERENCES [dbo].[Speciality] ([SpecialityID])
GO



Create table Feedback
(
FeedbackId [int] NOT NULL IDENTITY(1, 1) ,
FeedbackDescription varchar(max),
Quality float,
Infrastructure float,
WaitingTime float,
Score float,
DoctorId int,
PatientId int 
)

ALTER TABLE [dbo].[Feedback] ADD CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED  ([FeedbackId]) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Feedback] ADD CONSTRAINT [FK_Feedback_Hospitalid]FOREIGN KEY    ([HospitalId]) REFERENCES [dbo].[Hospital] ([HospitalId])
GO

ALTER TABLE [dbo].[Feedback] ADD CONSTRAINT [FK_Feedback_Doctorid]FOREIGN KEY    ([Doctorid]) REFERENCES [dbo].[Doctor] ([Doctorid])
GO

ALTER TABLE [dbo].[Feedback] ADD CONSTRAINT [FK_Feedback_Patientid]FOREIGN KEY    ([PatientId]) REFERENCES [dbo].[Patient] ([Patientid])
GO

Create table Appointment
(
AppointmentID [int] NOT NULL IDENTITY(1, 1) ,

DoctorId int,
PatientId int,
Date DateTime
)

ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED  ([AppointmentID]) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [FK_Appointment_Hospitalid]FOREIGN KEY   ([HospitalId]) REFERENCES [dbo].[Hospital] ([HospitalId])
GO

ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [FK_Appointment_Doctorid]FOREIGN KEY   ([Doctorid]) REFERENCES [dbo].[Doctor] ([Doctorid])
GO

ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [FK_Appointment_Patientid]FOREIGN KEY   ([PatientId]) REFERENCES [dbo].[Patient] ([Patientid])
GO

