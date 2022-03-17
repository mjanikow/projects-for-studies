CREATE TABLE client (
    client_ID int NOT null auto_increment,
    lastname varchar(30) NOT NULL,
    phone_num varchar(12) NOT NULL,
    CONSTRAINT client_pk PRIMARY KEY (client_ID)
);

-- Table: reservation
CREATE TABLE reservation (
    reservation_ID int NOT null auto_increment,
    reservation_start datetime NOT NULL,
    reservation_end datetime NULL,
    table_ID int NOT null ,
    client_ID int NOT NULL,
    CONSTRAINT reservation_pk PRIMARY KEY (reservation_ID)
);

-- Table: table
CREATE TABLE `table` (
    table_ID int NOT null auto_increment,
    table_number varchar(3) not null,
    seats int NOT NULL,
    localization varchar(20) NOT NULL,
    addons varchar(40) NULL,
    CONSTRAINT table_pk PRIMARY KEY (table_ID)
);

-- foreign keys
-- Reference: reservation_client (table: reservation)
ALTER TABLE reservation ADD CONSTRAINT reservation_client FOREIGN KEY reservation_client (client_ID)
    REFERENCES client (client_ID);

-- Reference: reservation_table (table: reservation)
ALTER TABLE reservation ADD CONSTRAINT reservation_table FOREIGN KEY reservation_table (table_ID)
    REFERENCES `table` (table_ID);
