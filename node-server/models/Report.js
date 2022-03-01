module.exports = (sequelize, DataTypes) => {
    return sequelize.define('report', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accountId: {
            type: DataTypes.INTEGER,
        },
        file: {
            type: DataTypes.STRING,
        },
        fromDate: {
            type: DataTypes.DATE,
        },
        toDate: {
            type: DataTypes.DATE,
        }
    });
}
