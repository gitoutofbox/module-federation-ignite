const db = require("../config/db");
const Account = db.Account;

const getAccounts = (req, res) => {
    Account.findAll({
        include: [
            {
                model: db.Client,
                as: 'client',
            },
        ]
    })
        .then(accounts => res.send(accounts))
        .catch(err => res.send(err))
};
const getAccountDetails = (req, res) => {
    Account.findOne({
        where: { id: req.params.id},
        include: [
            {
                model: db.Client,
                as: 'client',
            },
            {
                model: db.StockOptions,
                as: 'distribution',
            }
        ]
    })
        .then(accounts => res.send(accounts))
        .catch(err => res.send(err))
};
module.exports = {
    getAccounts,
    getAccountDetails
}