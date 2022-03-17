-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-11-29 22:30:23.099

-- foreign keys
ALTER TABLE reservation
    DROP FOREIGN KEY reservation_client;

ALTER TABLE reservation
    DROP FOREIGN KEY reservation_table;

-- tables
DROP TABLE client;

DROP TABLE reservation;

DROP TABLE `table`;

-- End of file.

