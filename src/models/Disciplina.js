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
    // Campos temporários (serão substituídos por associações depois)
    professorId: DataTypes.UUID,
    escolaId: DataTypes.UUID
  });

  // Associações serão implementadas depois
  Disciplina.associate = () => {};

  return Disciplina;
};