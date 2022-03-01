module.exports = (sequelize, DataTypes) => {
    return sequelize.define('prospect', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        }
    });
}
