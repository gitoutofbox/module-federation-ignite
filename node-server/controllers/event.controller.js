const db = require("../config/db");
const Event = db.Event;

const get = (req, res) => {
    Event.findAll({
        include: [
            {
                model: db.Prospect,
                as: 'prospect',
            },
        ]
    })
    .then(items => res.send(items))
    .catch(err => res.send(err))
};
const details = (req, res) => {
    Event.findOne({
        where: { id: req.params.id},
        include: [
            {
                model: db.Prospect,
                as: 'prospect',
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