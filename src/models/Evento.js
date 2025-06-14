module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define(
    "Evento",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      notaMaxima: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arquivos: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      disciplinaId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "Eventos",
      timestamps: false,
    }
  );

  Evento.associate = (models) => {
    Evento.belongsTo(models.Disciplina, {
      foreignKey: "disciplinaId",
      as: "disciplina",
    });

    Evento.belongsToMany(models.Aluno, {
      through: "EventoAlunos",
      foreignKey: "eventoId",
      otherKey: "alunoId",
      as: "alunos",
    });

    Aluno.belongsToMany(models.Evento, {
      through: "EventoAlunos",
      foreignKey: "alunoId",
      otherKey: "eventoId",
      as: "eventos",
    });
  };

  return Evento;
};
