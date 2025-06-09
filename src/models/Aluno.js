module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
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
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notas: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      defaultValue: []
    }
  });

  Aluno.associate = (models) => {
    Aluno.belongsToMany(models.Disciplina, {
      through: 'AlunoDisciplinas',
      foreignKey: 'alunoId',
      otherKey: 'disciplinaId'
    });
  };

  return Aluno;
};