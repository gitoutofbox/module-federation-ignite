module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prospectId: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        },
        comment: {
            type: DataTypes.STRING,
        }
    });
}
