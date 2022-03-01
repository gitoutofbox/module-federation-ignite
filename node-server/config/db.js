const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite', //'sqlite',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  storage: './database/ignite.db'
});

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

const db = {}
db.sequelize = sequelize;


db.Client = require("../models/Client")(sequelize, DataTypes)
db.Account = require("../models/Account")(sequelize, DataTypes)
db.StockOptions = require("../models/StockOptions")(sequelize, DataTypes)
db.AccountDistribution = require("../models/AccountDistribution")(sequelize, DataTypes)

db.Report = require("../models/Report")(sequelize, DataTypes)
db.Prospect = require("../models/Prospect")(sequelize, DataTypes)
db.Event = require("../models/Event")(sequelize, DataTypes)

/* key mapping for client-account */
db.Client.hasMany(db.Account, {
  as: 'accounts',
  foreignKey: 'clientId',
  onDelete: 'CASCADE',
  hooks: true
});
db.Account.belongsTo(db.Client);

/* key mapping for accountdistributions */
db.Account.belongsToMany(db.StockOptions, {
  through:  db.AccountDistribution,
  as: 'distribution',
  foreignKey: 'accountId',
  // otherKey: 'stockOptionId',
  onDelete: 'CASCADE',
  hooks: true
});

/* key mapping for account-report */
db.Account.hasMany(db.Report, {
  as: 'reports',
  foreignKey: 'accountId',
  onDelete: 'CASCADE',
  hooks: true
});
db.Report.belongsTo(db.Account);

/* key mapping for event-prospect */
db.Prospect.hasMany(db.Event, {
  as: 'events',
  foreignKey: 'prospectId',
  onDelete: 'CASCADE',
  hooks: true
});
db.Event.belongsTo(db.Prospect);

module.exports = db;