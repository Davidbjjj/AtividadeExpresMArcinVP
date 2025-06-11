module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    escolaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Escolas',
        key: 'id'
      }
    }
  });

  Professor.associate = (models) => {
    Professor.belongsTo(models.Escola, { foreignKey: 'escolaId' });
    Professor.hasMany(models.Disciplina, { foreignKey: 'professorId' });
  };

  return Professor;
};
