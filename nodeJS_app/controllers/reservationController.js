const { getReservations } = require('../repository/mysql2/ReservationRepository');
const TableRepository = require('../repository/mysql2/TableRepository');
const ReservationRepository = require('../repository/mysql2/ReservationRepository');
const ClientRepository = require('../repository/mysql2/ClientRepository')


exports.showReservationList = (req, res, next) => {
    TableRepository.getTables()
        .then(tables => {
            res.render('pages/administrationSide/reservationList_adm', {
                tables: tables,
                navLocation: 'reservation'
            })
        })

    //res.render('pages/administrationSide/reservationList_adm.ejs', { navLocation: 'reservation' })
}

exports.addReservation = (req, res, next) => {
    const reservationData = { ...req.body };


    const lastname = {}
    const phone_num = {}

    const clientData = {
        lastname: reservationData.lastname,
        phone_num: reservationData.phone_num
    }

    ClientRepository.addClient(clientData)
        .then(result => {
            ReservationRepository.addReservation(reservationData, reservationData.lastname, reservationData.phone_num)
                .then(result => {
                    res.redirect('/reservations/succes');
                })
                .catch(err => {
                    console.log("_______________________________-----------_________")
                    TableRepository.getTableById(reservationData.table_ID)
                        .then(table => {
                            res.render('pages/clientsSide/reservations/addReservation', {
                                table: table,
                                reservationStart: reservationData.reservation_start,
                                reservationEnd: reservationData.reservation_end,
                                navLocation: 'reservation',
                                validationErrors: err.details
                            })
                        })


                })
        })



};

exports.delete = (req, res, next) => {
    const reservationId = req.params.reservationId;
    ReservationRepository.deleteReservation(reservationId)
        .then(() => {
            res.redirect('/reservations/deleteSucces');
        })
};

exports.showAddReservationSuccess = (req, res, next) => {
    res.render('pages/clientsSide/reservations/addReservationSucces', { navLocation: 'reservation' })
}

exports.showDeleteReservationForm = (req, res, next) => {
    const reservationId = req.params.reservationId;

    ReservationRepository.getReservationDetails(reservationId)
        .then(reservation => {
            res.render('pages/administrationSide/deleteReservation', {
                reservation: reservation,
                navLocation: 'reservation',
            })
        })
}

exports.showDeleteReservationFormSucces = (req, res, next) => {
    res.render('pages/administrationSide/deleteReservationSuccess', { navLocation: 'reservation' })
}

exports.showContact = (req, res, next) => {
    res.render('pages/clientsSide/contact', { navLocation: 'contact' })
}

exports.showReservationDetails = (req, res, next) => {
    const reservationId = req.params.reservationId;

    ReservationRepository.getReservationDetails(reservationId)
        .then(reservation => {
            res.render('pages/clientsSide/reservations/reservationDetails', {
                reservation: reservation,
                navLocation: 'reservation',
            })
        })

}
exports.showAddReservationForm = (req, res, next) => {


    const newReservationData = req.params.newReservationData;
    const dataSplitted = newReservationData.split('|');
    const tableId = dataSplitted[0];
    var reservationStart = dataSplitted[1];
    var reservationEnd = dataSplitted[2];




    TableRepository.getTableById(tableId)
        .then(table => {
            res.render('pages/clientsSide/reservations/addReservation', {
                table: table,
                reservationStart: reservationStart,
                reservationEnd: reservationEnd,
                navLocation: 'reservation',
                table_ID: tableId,
                validationErrors: []
            })
        })
}

exports.showReservationSearchResults = (req, res, next) => {

    const reservationTimeData = req.params.reservationTimeData;


    ReservationRepository.getReservedTables(reservationTimeData)
        .then(reservedTables => {
            ReservationRepository.getFreeTables(reservationTimeData)
                .then(freeTables => {
                    res.render('pages/administrationSide/reservationList_results', {
                        reservedTables: reservedTables,
                        freeTables: freeTables,
                        navLocation: 'reservation'
                    })
                })
        });


    //res.render('pages/administrationSide/reservationList_adm.ejs', { navLocation: 'reservation' })
}