INSERT INTO client(client_ID, lastname, phone_num) VALUES
	(1, 'Kowalski', '543643643'),
	(2, 'Trojewski', '655443265'),
	(3, 'Nazwiskowski', '342434423')
	;

INSERT INTO `table`(table_ID, table_number, seats, localization, addons) VALUES
	(1, 'A1', 4, 'ogrodek', 'muzyka'),
	(2, 'B1', 6, 'sala glowna', 'muzyka, luksusowy'),
	(3, 'B2', 8, 'sala glowna','')
	
INSERT INTO reservation(reservation_ID, reservation_start, reservation_end, table_ID, client_ID) VALUES
	(1,'11-12-21 20:00', '29-11-21 22:00', '1', '1'),
	(2, '12-12-21 18:00', '29-11-21 23:59', '2', '2'),
	(3, '11-11-21 20:30', '29-11-21 23:00', '3', '3')
	;	
	
