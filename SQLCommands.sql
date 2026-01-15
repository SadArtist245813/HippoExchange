SHOW TABLES;

CREATE TABLE tblUsers(
	Email VARCHAR(250) PRIMARY KEY,
	FirstName VARCHAR(25),
    LastName VARCHAR(25),
    Password VARCHAR(500),
    CreatedDateTime datetime,
    LastUsedDateTime datetime
);

CREATE TABLE tblSessions(
	SessionID VARCHAR(50) PRIMARY KEY,
    UserID VARCHAR(250),
    CreatedDateTime datetime
);

CREATE TABLE tblBrands(
	BrandName VARCHAR(250) PRIMARY KEY,
    CreatedDateTime datetime
);

CREATE TABLE tblInventory(
	InventoryID VARCHAR(50) PRIMARY KEY,
    Brand VARCHAR(250),
    Model VARCHAR(250),
    Description VARCHAR(2000),
    Owner VARCHAR(250),
    Active boolean
);

CREATE TABLE tblLoans(
	LoanID VARCHAR(50) PRIMARY KEY,
    InventoryID VARCHAR(50),
    Borrower VARCHAR(250),
    DateOfLoan datetime,
    DateOfReturn datetime
);

DROP TABLE tblUsers;
DROP TABLE tblSessions;
DROP TABLE tblBrands;
DROP TABLE tblInventory;
DROP TABLE tblLoans;

ALTER USER 'root'@'localhost' IDENTIFIED BY '2025!';