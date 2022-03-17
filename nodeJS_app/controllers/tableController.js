const TableRepository = require('../repository/mysql2/TableRepository');

exports.EditTableForm = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.getTableById(tableId)
        .then(table => {
            res.render('pages/forms/tableForm',
                {
                    table: table,
                    pageTitle: 'Edytuj stolik',
                    formMode: 'edit',
                    btnLabel: 'Edytuj',
                    formAction: '/table/edit/' + tableId,
                    navLocation: 'none',
                    validationErrors: []
                })
        })


}

exports.EditTableSucces = (req, res, next) => {
    res.render('pages/administrationSide/editTableSuccess.ejs', { navLocation: 'none' })
}


exports.DeleteTable = (req, res, next) => {
    const detailsId = req.params.tableId;

    TableRepository.getTableById(detailsId)
        .then(table => {
            res.render('pages/forms/tableForm', {
                table: table,
                pageTitle: 'Stolik do usunięcia:',
                formMode: 'showDetails',
                formAction: 'tables/delete',
                navLocation: 'none',
                btnLabel: 'Usuń!',
                validationErrors: []

            })
        })
}

exports.DeleteTableSucces = (req, res, next) => {
    res.render('pages/administrationSide/deleteTableSuccess', { navLocation: 'none' })
}

exports.AddTableForm = (req, res, next) => {
    res.render('pages/forms/tableForm',
        {
            table: {},
            pageTitle: 'Dodaj stolik',
            formMode: 'createNew',
            btnLabel: 'Dodaj',
            formAction: '/table/add',
            navLocation: 'none',
            validationErrors: []
        })

}

exports.AddTableFormSucces = (req, res, next) => {
    res.render('pages/administrationSide/addTableFormSucces',
        {

            navLocation: 'none'
        })
}


exports.DetailsTable = (req, res, next) => {

    const detailsId = req.params.tableId;

    TableRepository.getTableById(detailsId)
        .then(table => {
            res.render('pages/forms/tableForm', {
                table: table,
                pageTitle: 'Szczegóły stolika',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'none',
                btnLabel: '',
                validationErrors: []

            })
        })
}
exports.addTable = (req, res, next) => {
    const tableData = { ...req.body };


    TableRepository.addTable(tableData)
        .then(result => {
            res.redirect('/table/addSucces');
        })
        .catch(err => {

            res.render('pages/forms/tableForm', {
                table: tableData,
                pageTitle: 'Dodawanie stołu',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/table/add',
                navLocation: '',
                validationErrors: err.details
            });
        });
};
exports.updateTable = (req, res, next) => {
    const tableId = req.params.tableId;
    const tableData = { ...req.body };
    TableRepository.UdpateTableOk(tableId, tableData)
        .then(result => {
            res.redirect('/table/editSucces');
        }).catch(err => {
            res.render('pages/forms/tableForm', {
                table: tableData,
                pageTitle: 'Edytowanie stołu',
                formMode: 'edit',
                btnLabel: 'Dodaj',
                formAction: '/table/edit/' + tableId,
                navLocation: '',
                validationErrors: err.details
            });
        });
};
exports.delete = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.deleteTable(tableId)
        .then(() => {
            res.redirect('/table/deleteSucces');
        })
};