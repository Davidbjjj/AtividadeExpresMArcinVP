module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nome é obrigatório"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "E-mail inválido"
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: "Senha deve ter entre 6 e 100 caracteres"
        }
      }
    }
  }, {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });

  return Aluno;
};