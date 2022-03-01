module.exports = (sequelize, DataTypes) => {
    return sequelize.define('accountDistribution', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accountId: {
            type: DataTypes.INTEGER,
        },
        stockOptionId: {
            type: DataTypes.INTEGER,
        },
        percentage: {
            type: DataTypes.FLOAT,
        }
    });
}
