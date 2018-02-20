USE [master]
GO
/****** Object:  Database [hackathonDb1]    Script Date: 8/20/2017 1:39:14 AM ******/
CREATE DATABASE [beats]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'hackathonDb1', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\hackathonDb1.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'hackathonDb1_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\hackathonDb1_log.ldf' , SIZE = 816KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [hackathonDb1] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [hackathonDb1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [hackathonDb1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [hackathonDb1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [hackathonDb1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [hackathonDb1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [hackathonDb1] SET ARITHABORT OFF 
GO
ALTER DATABASE [hackathonDb1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [hackathonDb1] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [hackathonDb1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [hackathonDb1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [hackathonDb1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [hackathonDb1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [hackathonDb1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [hackathonDb1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [hackathonDb1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [hackathonDb1] SET  ENABLE_BROKER 
GO
ALTER DATABASE [hackathonDb1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [hackathonDb1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [hackathonDb1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [hackathonDb1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [hackathonDb1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [hackathonDb1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [hackathonDb1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [hackathonDb1] SET RECOVERY FULL 
GO
ALTER DATABASE [hackathonDb1] SET  MULTI_USER 
GO
ALTER DATABASE [hackathonDb1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [hackathonDb1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [hackathonDb1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [hackathonDb1] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [hackathonDb1] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'hackathonDb1', N'ON'
GO
USE [hackathonDb1]
GO

/****** Object:  User [temp]    Script Date: 8/20/2017 1:39:14 AM ******/
CREATE USER [temp] FOR LOGIN [temp] WITH DEFAULT_SCHEMA=[temp]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 8/19/2017 10:48:23 PM ******/

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[AppointmentID] [int] IDENTITY(1,1) NOT NULL,
	[DoctorId] [int] NULL,
	[PatientId] [int] NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED 
(
	[AppointmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Bloodgroup]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bloodgroup](
	[BloodgroupID] [int] IDENTITY(1,1) NOT NULL,
	[BloodGroupName] [nchar](4) NULL,
 CONSTRAINT [PK_Bloodgroup] PRIMARY KEY CLUSTERED 
(
	[BloodgroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Doctor](
	[DoctorId] [int] IDENTITY(1,1) NOT NULL,
	[DoctorName] [varchar](max) NULL,
	[Gender] [char](1) NULL,
	[Age] [int] NULL,
	[latitude] [float] NULL,
	[longitude] [float] NULL,
	[SpecialityID] [int] NULL,
	[HospitalId] [int] NULL,
 CONSTRAINT [PK_Doctor] PRIMARY KEY CLUSTERED 
(
	[DoctorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Feedback](
	[FeedbackId] [int] IDENTITY(1,1) NOT NULL,
	[FeedbackTitle] [varchar](max) NULL,
	[Quality] [float] NULL,
	[Waiting] [float] NULL,
	[Infrastructure] [float] NULL,
	[DoctorId] [int] NULL,
	[PatientId] [int] NULL,
	[appointmentId] [int] NULL,
	[FeedbackDescription] [varchar](max) NULL,
 CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
(
	[FeedbackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Feedback_computed]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback_computed](
	[ComputedId] [int] IDENTITY(1,1) NOT NULL,
	[DoctorId] [int] NULL,
	[Quality] [float] NULL,
	[Waiting] [float] NULL,
	[Infrastructure] [float] NULL,
	[OverallScore] [float] NULL,
 CONSTRAINT [PK_Feedback_computed] PRIMARY KEY CLUSTERED 
(
	[ComputedId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Hospital]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Hospital](
	[HospitalId] [int] IDENTITY(1,1) NOT NULL,
	[HospitalName] [varchar](max) NULL,
	[latitude] [float] NULL,
	[longitude] [float] NULL,
 CONSTRAINT [PK_Hospital] PRIMARY KEY CLUSTERED 
(
	[HospitalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [int] IDENTITY(1,1) NOT NULL,
	[patientName] [varchar](max) NULL,
	[Gender] [char](1) NULL,
	[Age] [int] NULL,
	[latitude] [float] NULL,
	[longitude] [float] NULL,
	[BloodGroupID] [int] NULL,
	[mobilenumber] [bigint] NULL,
 CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[speciality]    Script Date: 8/19/2017 10:48:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[speciality](
	[SpecialityID] [int] IDENTITY(1,1) NOT NULL,
	[Specialityname] [varchar](max) NULL,
 CONSTRAINT [PK_speciality] PRIMARY KEY CLUSTERED 
(
	[SpecialityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_Doctorid] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_Doctorid]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_Patientid] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_Patientid]
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_Hospitalid] FOREIGN KEY([HospitalId])
REFERENCES [dbo].[Hospital] ([HospitalId])
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_Hospitalid]
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_SpecialityID] FOREIGN KEY([SpecialityID])
REFERENCES [dbo].[speciality] ([SpecialityID])
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_SpecialityID]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_Doctorid] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_Doctorid]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_Patientid] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_Patientid]
GO
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_BloodGroupID] FOREIGN KEY([BloodGroupID])
REFERENCES [dbo].[Bloodgroup] ([BloodgroupID])
GO
ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_BloodGroupID]
GO
USE [master]
GO
ALTER DATABASE [hackathonDb1] SET  READ_WRITE 
GO
