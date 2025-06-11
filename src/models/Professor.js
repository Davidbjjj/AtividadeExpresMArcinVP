const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Professor = sequelize.define('Professor', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    professorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Professors',
        key: 'id'
      },
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    escolaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Escolas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  });

  return Professor;
};
