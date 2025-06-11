module.exports = (sequelize, DataTypes) => {
  const Disciplina = sequelize.define('Disciplina', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    professorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Professors',
        key: 'id'
      }
    },
    escolaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Escolas',
        key: 'id'
      }
    }
  });

  Disciplina.associate = models => {
    Disciplina.belongsTo(models.Professor, { foreignKey: 'professorId' });
    Disciplina.belongsTo(models.Escola, { foreignKey: 'escolaId' });
    Disciplina.belongsToMany(models.Aluno, { through: 'AlunoDisciplinas' });
  };

  return Disciplina;
};
