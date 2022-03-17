const db = require('../../config/mysql2/db')

exports.getClients = () => {
    return db.promise().query('SELECT * FROM client')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getClient = function (lastname, phone_num) {

    const sql = 'SELECT client_ID FROM client where lastname = ? && phone_num = ? '
    db.promise().execute(sql, [lastname, phone_num])
        .then((results, fields) => {
            console.log("getClient function:")
            console.log(results[0][0].client_ID)

            return results[0][0].client_ID;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};





exports.addClient = (newClientData) => {
    const lastname = newClientData.lastname;
    const phone_num = newClientData.phone_num;
    const sql = "INSERT INTO `client` (`lastname`, `phone_num`) " +
        "SELECT ?, ? FROM DUAL " +
        "WHERE NOT EXISTS (SELECT * FROM `client` " +
        "WHERE `lastname`=? AND `phone_num`=? LIMIT 1) "
    return db.promise().execute(sql, [lastname, phone_num, lastname, phone_num]);
};

