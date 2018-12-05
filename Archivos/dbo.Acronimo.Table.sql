SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Acronimo](
	[Acronimo] [varchar](10) NOT NULL,
	[Termino] [varchar](100) NULL,
 CONSTRAINT [priAcronimo] PRIMARY KEY CLUSTERED 
(
	[Acronimo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
