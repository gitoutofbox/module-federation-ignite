module.exports = (sequelize, DataTypes) => {
    return sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        }
    });
}
