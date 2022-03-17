const db = require('../../config/mysql2/db')
const ClientRepository = require('../mysql2/ClientRepository')
const reservationSchema = require('../../model/joi/Reservation')

exports.getReservations = () => {
    return db.promise().query('SELECT * FROM reservation')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getReservationById = (reservationId) => {
    const query = "select reservation_start, reservation_end, table_ID, client_ID from reservation where reservation_ID = ? "
    return db.promise().query(query, [reservationId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow)
                return { message: ' fail' };
            const reservation = {
                reservation_ID: parseInt(reservationId),
                reservation_start: firstRow.reservation_start,
                reservation_end: firstRow.reservation_end,
                table_ID: firstRow.table_ID,
                client_ID: firstRow.client_ID
            }


            return reservation;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getFreeTables = (reservationTimeData) => {
    //console.log(reservationTimeData + " : o");
    const dataSplitted = reservationTimeData.split('|');
    var reservationStart = dataSplitted[0];
    var reservationEnd = dataSplitted[1];

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes()
    today = yyyy + '-' + mm + '-' + dd + '-' + time;

    var query = ""

    console.log(reservationStart.length)

    if (reservationStart.length < 12)
        query = "select null"
    else if (today > reservationStart || today > reservationEnd)
        query = "select null"
    else if (reservationStart > reservationEnd)
        query = "select null"
    else {
        query = "select t.table_ID, t.table_number, t.seats from `table` t WHERE t.table_ID  NOT IN " +
            "(select t.table_ID " +
            "from `table` t left join reservation r on r.table_ID = t.table_ID " +
            "where (Convert(?, datetime) > r.reservation_start && Convert(?, datetime) < r.reservation_end) || (Convert(?, datetime) > r.reservation_start && Convert(?, datetime) < r.reservation_end) ) order by t.table_number";
    }



    return db.promise().query(query, [reservationStart, reservationStart, reservationEnd, reservationEnd])
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getReservedTables = (reservationTimeData) => {
    //console.log(reservationTimeData);
    const dataSplitted = reservationTimeData.split('|');
    var reservationStart = dataSplitted[0];
    var reservationEnd = dataSplitted[1];
    const query = "select t.table_ID, t.table_number, t.seats, r.reservation_ID, r.reservation_start, r.reservation_end, r.reservation_ID " +
        "from `table` t left join reservation r on r.table_ID = t.table_ID " +
        "where (Convert(?, datetime) > r.reservation_start && Convert(?, datetime) < r.reservation_end) || (Convert(?, datetime) > r.reservation_start && Convert(?, datetime) < r.reservation_end) order by t.table_number";
    return db.promise().query(query, [reservationStart, reservationStart, reservationEnd, reservationEnd])
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getReservationDetails = (reservationId) => {
    const query = "select t.table_number, r.reservation_start, r.reservation_end, r.reservation_ID, c.lastname, c.phone_num " +
        "from `table` t join reservation r on t.table_ID = r.table_ID " +
        "join client c on c.client_ID = r.client_ID where r.reservation_ID like ?;"
    return db.promise().query(query, [reservationId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow)
                return { message: ' fail' };
            const reservation = {
                reservation_ID: firstRow.reservation_ID,
                table_number: firstRow.table_number,
                reservation_start: firstRow.reservation_start,
                reservation_end: firstRow.reservation_end,
                lastname: firstRow.lastname,
                phone_num: firstRow.phone_num
            }
            return reservation;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};


exports.addReservation = (newReservationData, lastname, phone_num) => {

    const vRes = reservationSchema.validate(newReservationData, { abortEarly: false })
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const reservation_start = newReservationData.reservation_start;
    const reservation_end = newReservationData.reservation_end;
    const table_number = newReservationData.table_number;


    const sql = 'INSERT into reservation (reservation_start, reservation_end, table_ID, client_ID) values (?, ?, (SELECT table_ID from `table` where table_number = ?), (SELECT client_ID FROM client where lastname = ? && phone_num = ?))'
    return db.promise().execute(sql, [reservation_start, reservation_end, table_number, lastname, phone_num]);
};


exports.deleteReservation = (reservationId) => {
    const sql1 = 'delete from reservation where reservation_ID = ?'

    return db.promise().execute(sql1, [reservationId]);
};