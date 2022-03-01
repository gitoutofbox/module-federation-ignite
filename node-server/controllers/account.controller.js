const db = require("../config/db");
const Account = db.Account;

const getAccounts = (req, res) => {
  Account.findAll({
    include: [
      {
        model: db.Client,
        as: "client",
      },
    ],
  })
    // .then(accounts => res.send(accounts))
    .then((accounts) => {
      accounts.sort(function (a, b) {
        // Sort by Client Name
        var nameA = a.client.name.toUpperCase();
        var nameB = b.client.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      res.send(accounts);
    })
    .catch((err) => res.send(err));
};
const getAccountDetails = (req, res) => {
  Account.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.Client,
        as: "client",
      },
      {
        model: db.StockOptions,
        as: "distribution",
      },
    ],
  })
    .then((accounts) => res.send(accounts))
    .catch((err) => res.send(err));
};
module.exports = {
  getAccounts,
  getAccountDetails,
};
