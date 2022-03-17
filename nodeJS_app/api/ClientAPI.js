const { response } = require('../app');
const ClientRepository = require('../repository/mysql2/ClientRepository');

exports.getClients = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.addClient = (req, res, next) => {
    ClientRepository.addClient(req.body)
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

