-- =============================================
-- Author:	Narla	Jayanth
-- Create date: 23-12-2020
-- Description:	Database and Table creation
-- =============================================

--Database and tables creation start

drop database dbBanking


create database dbBanking
use dbBanking

--do we need to add not null to everything
create table tblAccounts 
(
	cust_id varchar(20) foreign key references tblCustomer(cust_id),
	acc_number varchar(20) primary key,
	acc_type varchar(50) not null,
	minbalance varchar(10) not null,
	balance varchar(20) not null,
	open_date date not null,
)
select * from tblAccounts
--drop table tblAccounts
--truncate table tblAccounts

create table tblCustomer
(
	aadhar varchar(20) unique not null,
	cust_id varchar(20) primary key,
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
--truncate table tblCustomer
select * from tblCustomer

--do I need to store the remark? I don't think so. ASK
create table tblTransaction
(
	transaction_id varchar(50) primary key,
	acc_number varchar(20) foreign key references tblAccounts(acc_number),
	transaction_type varchar(10) not null,
	tran_date date not null,
	cred_acc varchar(20) not null,
	deb_acc varchar(20) not null,
	transac_amt varchar(20) not null,
	deb_bal varchar(20) not null,
	cred_bal varchar(20) not null,
	mat_ins varchar(50),
	remark varchar(50)
)
--drop table tblTransaction
--truncate table tblTransaction

create table tblLogin
(
	acc_number varchar(20) foreign key references tblAccounts(acc_number),
	cust_id varchar(20) primary key,
	user_type varchar(20) not null,
	pwd varchar(20) not null,
)
--drop table tblLogin
--truncate table tblLogin
select * from tblLogin


create table tblBlocked
(

	cust_id varchar(20) primary key,
	acc_number varchar(20) foreign key references tblAccounts(acc_number),
)
--drop table tblBlocked
--truncate table tblBlocked


create table tblInternetBanking
(
	cust_id varchar(20) primary key,
	acc_number varchar(20) foreign key references tblAccounts(acc_number),
	pwd varchar(20) not null,
	Tpwd varchar(20) not null,
)
--drop table tblInternetBanking
--truncate table tblInternetBanking
select * from tblInternetBanking

create table tblBeneficiary
(
	ben_acc_num varchar(20) foreign key references tblAccounts(acc_number),
	cust_id varchar(20) primary key,
	ben_name varchar(50) not null,
	nickname varchar(20)
)
--drop table tblBeneficiary
--truncate table tblBeneficiary

create table tblStatus
(
	ref_no int identity(1628,1) primary key,
	cust_id varchar(20) foreign key references tblCustomer (cust_id),
	app_by varchar(20) not null,
	acc_status varchar(10) check(acc_status in ('approved','denied','pending')) not null,
	app_date date not null
)
--drop table tblStatus
--truncate table tblStatus



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
alter PROCEDURE proc_UserReg 
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
	insert into tblCustomer (aadhar,cust_id,title,first_name,middle_name,last_name,father_name,phone,cust_mail,dob,age,res_address,perm_address,gender) values (@aadhar,@cust_id,@title,@first_name,@middle_name,@last_name,@father_name,@phone,@cust_mail,@dob,@age,@res_address,@perm_address,@gender);
	insert into tblStatus (cust_id,app_by,acc_status,app_date) values(@cust_id,'admin','pending',GETDATE()); 
	
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
create PROCEDURE proc_UserLogin 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20),
	@pwd varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Retrieve user details on condition match
	Select  cust_id,acc_number,user_type
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
	@acc_number varchar(20),
	@user_type varchar(20),
	@pwd varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert Login Details of User
	Insert into tblLogin (cust_id, acc_number,user_type,pwd) values ( @cust_id, @acc_number, @user_type, @pwd )
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
-- Description:	Get a single Customer Details
-- =============================================
create PROCEDURE proc_getCustDetails 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert blocked customers
	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, cust_id,  father_name, phone, cust_mail, dob, age, res_address, gender from tblCustomer where cust_id = @cust_id;
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
-- Description:	Get all Customer Details
-- =============================================
create PROCEDURE proc_getAllCustDetails 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert blocked customers
	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, cust_id,  
	father_name, phone, cust_mail, dob, age, res_address, gender from tblCustomer;
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
-- Description:	Get all Customer Details along with application status
-- =============================================
create PROCEDURE proc_getAllCustDetailsAlongWithAppStatus 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert blocked customers
	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, c.cust_id,  
	father_name, phone, cust_mail, dob, age, res_address, gender,acc_status, ref_no,app_by,app_date from tblCustomer c join tblStatus s
	on c.cust_id = s.cust_id;
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get Apllication Status
-- =============================================
CREATE PROCEDURE proc_getAppStatus 
	-- Add the parameters for the stored procedure here
	@cust_id varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select ref_no, cust_id, app_by, acc_status, app_date from tblStatus where cust_id = @cust_id;
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
CREATE PROCEDURE proc_getAllAppStatus 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select ref_no, cust_id, app_by, acc_status, app_date from tblStatus;
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_getAllPendingAppStatus 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, c.cust_id,  
	father_name, phone, cust_mail, dob, age, res_address, gender,s.acc_status from tblCustomer c join tblStatus s
	on c.cust_id = s.cust_id where s.acc_status = 'pending'; 
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_getAllApprovedAppStatus 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, c.cust_id,  
	father_name, phone, cust_mail, dob, age, res_address, gender,s.acc_status from tblCustomer c join tblStatus s
	on c.cust_id = s.cust_id where s.acc_status = 'approved'; 
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_getAllDeniedAppStatus 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	select CONCAT_WS(' ',title,first_name,middle_name,last_name) cust_name , aadhar, c.cust_id,  
	father_name, phone, cust_mail, dob, age, res_address, gender,s.acc_status from tblCustomer c join tblStatus s
	on c.cust_id = s.cust_id where s.acc_status = 'denied'; 

	--select ref_no, cust_id, app_by, acc_status, app_date from tblStatus where acc_status = 'denied';
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_toggleAppStatus 
	@ref_no int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update tblStatus set acc_status = 'approved', app_date = GETDATE() where ref_no = @ref_no;
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_denyAppStatus 
	@ref_no int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update tblStatus set acc_status = 'denied' ,app_date = GETDATE() where ref_no = @ref_no;
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
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_getApplicationByRefno 
	@ref_no int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select ref_no,cust_id,app_by, acc_status,app_date from tblStatus where ref_no = @ref_no;
END
GO





SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
alter PROCEDURE proc_verifyMail
	@cust_id varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @check_cust varchar(50)
	set @check_cust = (select cust_id from tblLogin where cust_id = @cust_id)

	if(@check_cust = @cust_id)
		select a.cust_id, cust_mail from tblAccounts a join tblCustomer c 
		on a.cust_id = c.cust_id
		where a.cust_id = @cust_id ;
	else
		select '-1' as cust_id, '-1' as cust_mail from tblAccounts a join tblCustomer c 
		on a.cust_id = c.cust_id
		where a.cust_id = '17613' ;
END
GO




SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Jayanth
-- Create date: 02-01-2021
-- Description:	Get all Application Status
-- =============================================
create PROCEDURE proc_verifyMailByAccNum
	@acc_num varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select a.acc_number, cust_mail from tblAccounts a join tblCustomer c 
	on a.cust_id = c.cust_id
	where a.acc_number = @acc_num ;
END
GO

proc_verifyMailByAccNum 'PGBNKG841387726'




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
-- Author:		Shiyamala
-- Create date: 09-01-2021
-- Description:	For Account summary
-- =============================================
CREATE PROCEDURE proc_GetTopTransactions
(@acc varchar(20))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select top 10 * from tblTransaction
	where cred_acc=@acc or deb_acc=@acc
	order by tran_date desc
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
-- Author:		Shiyamala
-- Create date: 09-01-2021
-- Description:	For Account statement
-- =============================================
CREATE PROCEDURE proc_GetTransactionsWithinDate
(@acc varchar(20),@from date,@to date)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select * from tblTransaction
	where (cred_acc=@acc or deb_acc=@acc) and (tran_date>=@from and tran_date<=@to)
	order by tran_date desc
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
-- Author:		Shiyamala
-- Create date: 09-01-2021
-- Description:	To get account details
-- =============================================
CREATE PROCEDURE proc_GetAccountDetails
(@acc varchar(20))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	Declare @cus varchar(30);
	SET @cus=(select cust_id from tblAccounts where acc_number=@acc)
	
	-- Insert statements for procedure here
	select cust_id,acc_number,acc_type,balance,
	(select CONCAT(first_name,' ',middle_name,' ',last_name)from tblCustomer where cust_id=@cus) as Name
	from tblAccounts where acc_number=@acc
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
-- Author:		Shiyamala
-- Create date: 10-01-2021
-- Description:	Get all beneficiary
-- =============================================
CREATE PROCEDURE proc_GetBeneficiaries
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select * from tblBeneficiary
END
GO






create procedure proc_Internet_register(
@cid varchar(20),
@acno varchar(20),
@pwd varchar(20),
@tpwd varchar(20))
as
begin
	insert into tblInternetBanking(cust_id,acc_number,pwd,Tpwd) values(@cid,@acno,@pwd,@tpwd)
end





create proc proc_status_by_id(@cid varchar(20))
as
begin
	select s.*,CONCAT(first_name,middle_name,last_name) AS Customer_Name from tblStatus s inner join tblCustomer c on c.cust_id=s.cust_id where c.cust_id=@cid
end




create proc proc_getStatusbyId(@cid varchar(20))
as
begin
	select s.*,CONCAT(first_name,middle_name,last_name) AS Customer_Name from tblStatus s inner join tblCustomer c on c.cust_id=s.cust_id where c.cust_id=@cid
end





create procedure proc_Internet_login(
@cid varchar(20),
@acno varchar(20),
@pwd varchar(20),
@tpwd varchar(20))
as
begin
	insert into tblInternetBanking(cust_id,acc_number,pwd,Tpwd) values(@cid,@acno,@pwd,@tpwd)
	insert into tblLogin(acc_number,cust_id,user_type,pwd) values(@acno,@cid,'Customer',@pwd)
end



create proc getallCustomers(
@aadhar varchar(20))
as
begin 
	select * from tblCustomer where @aadhar=aadhar
end



--drop proc getallCustomers





--test case data

--truncate table tblLogin

exec getallCustomers '12345678'
exec proc_Internet_login '123','121212121212121','abcd','abcde'
exec  proc_getStatusbyId '73234'
exec proc_status_by_id '73234'
exec proc_Internet_register '03','1003','Qwerty!23','Qwerty!23'
exec proc_UserReg '12121345678','1213','Mr','aaaa','kk','bbbb','llll','9886610370','aaaa@gmail.com','2020/02/01',23,'hjsnj','hjdien','Male'

select * from tblCustomer
select * from tblStatus

proc_setUserLogin 'J1234','456456','customer','Qwerty!23'
proc_setUserLogin 'R1234','123123','admin','Qwerty!23'


proc_UserLogin 'J1234','Qwerty!23'
proc_UserLogin 'R1234','Qwerty!23'


proc_getCustDetails 'J1234'
proc_getCustDetails 'Q1234'
proc_getCustDetails 'R1234'
proc_getCustDetails 'S1234'


proc_getAllCustDetails


proc_toggleAppStatus '123'
proc_getAppStatus 'R1234'


proc_getAllPendingAppStatus
proc_getAllApprovedAppStatus
proc_getAllDeniedAppStatus
proc_getAllAppStatus
proc_getAllCustDetailsAlongWithAppStatus


proc_GetTopTransactions'111111111111111'
proc_GetTransactionsWithinDate '111111111111111','2021-01-08','2021-01-09'
proc_GetAccountDetails '111111111111111'


select * from tblStatus

select * from tblLogin

select * from tblAccounts;

select * from tblBeneficiary

select * from tblTransaction order by tran_date desc

select * from tblLogin
select * from tblCustomer
select * from tblStatus
select * from tblAccounts
select * from tblInternetBanking


