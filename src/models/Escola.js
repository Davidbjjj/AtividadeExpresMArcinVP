module.exports = (sequelize, DataTypes) => {
  const Escola = sequelize.define('Escola', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Escola.associate = (models) => {
    Escola.hasMany(models.Professor, { foreignKey: 'escolaId' });
    Escola.hasMany(models.Disciplina, { foreignKey: 'escolaId' });
  };

  return Escola;
};
