-- =============================================
-- Author:	Narla	Jayanth
-- Create date: 23-12-2020
-- Description:	Database and Table creation
-- =============================================

--Database and tables creation start

create database dbBanking
use dbBanking

--do we need to add not null to everything

create table tblAccounts 
(
	cust_id varchar(20) primary key,
	acc_type varchar(50) not null,
	minbalance varchar(10) not null,
	acc_number varchar(20) unique not null,
	balance varchar(20) not null,
	open_date date not null,
)
--drop table tblAccounts

create table tblCustomer
(
	aadhar varchar(20) primary key,
	cust_id varchar(20) foreign key references tblAccounts(cust_id),
	title varchar(5) not null,
	first_name varchar(30) not null,
	middle_name varchar(30),
	last_name varchar(30) not null,
	father_name varchar(50) not null,
	phone varchar(15) not null,
	cust_mail varchar(50) not null,
	dob date not null,
	age int not null,
	res_address varchar(200) not null,
	perm_address varchar(200) not null,
	gender varchar(10) check (gender in ('Male','Female','Prefer not to say')) not null,
)
--drop table tblCustomer

--do I need to store the remark? I don't think so. ASK
create table tblTransaction
(
	transaction_id varchar(50) primary key,
	cust_id varchar(20) foreign key references tblAccounts(cust_id),
	transaction_type varchar(10) not null,
	tran_date date not null,
	cred_acc varchar(20) not null,
	deb_acc varchar(20) not null,
	transac_amt varchar(20) not null,
	deb_bal varchar(20) not null,
	cred_bal varchar(20) not null
)
--drop table tblTransaction

create table tblLogin
(
	cust_id varchar(20) foreign key references tblAccounts(cust_id),
	userId varchar(20) primary key,
	user_type varchar(20) not null,
	pwd varchar(20) not null,
)
--drop table tblLogin

create table tblBlocked
(
	cust_id varchar(20) foreign key references tblAccounts(cust_id),
	acc_number varchar(20) primary key,
)
--drop table tblBlocked


create table tblInternetBanking
(
	cust_id varchar(20) foreign key references tblAccounts(cust_id),
	acc_number varchar(20) primary key,
	pwd varchar(20) not null,
	Tpwd varchar(20) not null,
)
--drop table tblInternetBanking


create table tblBeneficiary
(
	ben_acc_num varchar(20) primary key,
	cust_acc_num varchar(20) foreign key references tblAccounts(acc_number),
	username varchar(50) not null,
	nickname varchar(20) not null
)
--drop table tblBeneficiary

create table tblStatus
(
	ref_no varchar(20) primary key,
	aadhar varchar(20) foreign key references tblCustomer (aadhar),
	app_by varchar(20) not null,
	acc_status varchar(10) check(acc_status in ('approved','denied')) not null,
	app_date date not null
)
--drop table tblBeneficiary

-- Finished Database and table creation



--Stored Procedures


-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Narla	Jayanth
-- Create date: 25-12-2020
-- Description:	User Registration
-- =============================================
CREATE PROCEDURE proc_UserReg 
	-- Add the parameters for the stored procedure here
	@aadhar varchar(20),
	@cust_id varchar(20),
	@title varchar(20),
	@first_name varchar(30),
	@middle_name varchar(30),
	@last_name varchar(30),
	@father_name varchar(50),
	@phone varchar(15),
	@cust_mail varchar(50),
	@dob date,
	@age int,
	@res_address varchar(200),
	@perm_address varchar(200),
	@gender varchar(10)
AS
BEGIN 
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into tblCustomer (aadhar,cust_id,title,first_name,middle_name,last_name,father_name,phone,cust_mail,dob,age,res_address,perm_address,gender) values (@aadhar,@cust_id,@title,@first_name,@middle_name,@last_name,@father_name,@phone,@cust_mail,@dob,@age,@res_address,@perm_address,@gender)
END
GO



-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Narla Jayanth
-- Create date: 25-12-2020
-- Description:	User Login
-- =============================================
Create PROCEDURE proc_UserLogin 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20),
	@userId varchar(20),
	@user_type varchar(20),
	@pwd varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Retrieve user details on condition match
	Select  cust_id,userId,user_type
	from tblLogin
	where cust_id = @cust_id AND pwd = @pwd AND cust_id not in (select cust_id from tblBlocked)
END
GO


-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Narla Jayanth
-- Create date: 25-12-2020
-- Description:	User Login
-- =============================================
Create PROCEDURE proc_setUserLogin 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20),
	@userId varchar(20),
	@user_type varchar(20),
	@pwd varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert Login Details of User
	Insert into tblLogin (cust_id, userId,user_type,pwd) values ( @cust_id, @userId, @user_type, @pwd )
END
GO





-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Narla Jayanth
-- Create date: 25-12-2020
-- Description:	Get Blocked Contacts
-- =============================================
Create PROCEDURE proc_GetBlocked 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20),
	@acc_number varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Get blocked customers
	SELECT * from tblBlocked
END
GO




-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Narla Jayanth
-- Create date: 25-12-2020
-- Description:	Insert Blocked Contacts
-- =============================================
Create PROCEDURE proc_InsBlocked 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20),
	@acc_number varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert blocked customers
	Insert into tblBlocked (cust_id,acc_number) values (@cust_id,@acc_number)
END
GO
