const db = require('../../config/mysql2/db');
const tableSchema = require('../../model/joi/Table');

exports.getTables = () => {
    return db.promise().query('SELECT * FROM `table` order by table_number')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getTableById = (tableId) => {
    const query = 'select table_ID, table_number, seats, localization, addons from `table` where table_ID = ? '
    return db.promise().query(query, [tableId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow)
                return {};
            const table = {
                table_ID: parseInt(tableId),
                table_number: firstRow.table_number,
                seats: firstRow.seats,
                localization: firstRow.localization,
                addons: firstRow.addons
            }
            return table;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.addTable = (newTableData) => {

    const vRes = tableSchema.validate(newTableData, { abortEarly: false });


    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkTableUnique(newTableData.table_number)
        .then(tableErr => {
            if (tableErr.details) {
                console.log(tableErr)
                return Promise.reject(tableErr);
            }
            else {

                const table_number = newTableData.table_number;
                const seats = newTableData.seats;
                const localization = newTableData.localization;
                const addons = newTableData.addons;

                console.log(table_number, seats, localization, addons)

                const sql = 'INSERT into `table` (table_number, seats, localization, addons) values (?, ?, ?, ?)'
                return db.promise().execute(sql, [table_number, seats, localization, addons]);
            }
        })
        .catch(err => {
            console.log("CATCH________________ERROR")

            return Promise.reject(err);
        })

};

exports.UdpateTableOk = (tableId, tableData) => {
    const vRes = tableSchema.validate(tableData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkTableUnique(tableData.table_number, tableId)
        .then(tableErr => {
            if (tableErr.details) {
                return Promise.reject(tableErr);
            }
            else {
                const table_number = tableData.table_number;
                const seats = tableData.seats;
                const localization = tableData.localization;
                const addons = tableData.addons;
                console.log(table_number + ", " + seats + ", " + localization + ", " + addons + ":tableId: " + tableId)

                const sql = 'update `table` set table_number = ?, seats = ?, localization = ?, addons = ? where table_ID = ?';
                return db.promise().execute(sql, [table_number, seats, localization, addons, tableId]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })


};

exports.deleteTable = (tableId) => {
    const sql1 = 'delete from `table` where table_ID = ?'
    const sql2 = 'delete from reservation where table_ID = ?'

    return db.promise().execute(sql2, [tableId])
        .then(() => {
            return db.promise().execute(sql1, [tableId])
        });
};

checkTableUnique = (table_number, tableId) => {
    let sql, promise;
    if (tableId) {
        sql = 'select count(1) as c from `table` where table_ID != ? and table_number = ?';
        promise = db.promise().query(sql, [tableId, table_number]);
    } else {
        sql = 'select count(1) as c from `table` where table_number = ?';
        promise = db.promise().query(sql, [table_number]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['table_number'],
                    message: 'Podany numer stolika jest już używany'
                }]
            };
        }
        return err;
    });
}