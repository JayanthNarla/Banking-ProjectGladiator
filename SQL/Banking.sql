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
	open_date date not null
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
