SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ACInversionAuto](
	[CxpID] [int] NOT NULL,
	[ID] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[Accion] [varchar](20) NULL,
	[Importe] [money] NULL,
	[CtaDinero] [varchar](10) NULL,
	[Beneficiario] [varchar](100) NULL,
	[Nota] [varchar](100) NULL,
	[TipoCredito] [varchar](50) NULL,
	[TipoTasa] [varchar](20) NULL,
	[Condicion] [varchar](50) NULL,
 CONSTRAINT [priACInversionAuto] PRIMARY KEY CLUSTERED 
(
	[CxpID] ASC,
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
