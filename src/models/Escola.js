module.exports = (sequelize, DataTypes) => {
    const Escola = sequelize.define('Escola', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Escola;
};
