module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accountNumber: {
            type: DataTypes.INTEGER,
        },
        clientId: {
            type: DataTypes.INTEGER,
        },
        investedAmount: {
            type: DataTypes.INTEGER,
        },
        riskScore: {
            type: DataTypes.INTEGER,
        }
    });
}
