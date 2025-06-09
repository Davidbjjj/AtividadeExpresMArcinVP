module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define('Professor', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Professor;
};
