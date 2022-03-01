const db = require("../config/db");
const Report = db.Report;

const get = (req, res) => {
    Report.findAll({
        include: [
            {
                model: db.Account,
                as: 'account',
            },
        ]
    })
    .then(items => res.send(items))
    .catch(err => res.send(err))
};
const details = (req, res) => {
    Report.findOne({
        where: { id: req.params.id},
        include: [
            {
                model: db.Accuont,
                as: 'account',
            }
        ]
    })
        .then(items => res.send(items))
        .catch(err => res.send(err))
};
module.exports = {
    get,
    details
}