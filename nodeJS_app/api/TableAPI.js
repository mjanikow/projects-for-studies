const { response } = require('../app');
const TableRepository = require('../repository/mysql2/TableRepository');

exports.getTables = (req, res, next) => {
    TableRepository.getTables()
        .then(tables => {
            res.status(200).json(tables);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getTableById = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.getTableById(tableId)
        .then(table => {
            if (!table)
                res.status(404).json({
                    message: 'Table with id: ' + tableId + ' not found'
                })
            else {
                res.status(200).json(table);
            }
        })
}

exports.addTable = (req, res, next) => {
    TableRepository.addTable(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateTable = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.udpateTable(tableId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Table updated.', table: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteTable = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.deleteTable(tableId)
        .then(result => {
            res.status(200).json({ message: 'Removed table.', table: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}