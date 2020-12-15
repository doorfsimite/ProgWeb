'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Curso);
      this.hasMany(models.Partida);
      // define association here
    }
  };
  User.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg:"Preencha esse campo"},
        len: {
          args: [4, 40],
          msg: 'Nome pequeno.'
        }
      },
    },
    email: {
      validate:{
        notEmpty: {msg:"Preencha esse campo"},
        isEmail:{
        msg:"E-mail Inválido"
        },
      },
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      validate:{
        notEmpty: {msg:"Preencha esse campo"},
        min:{
          msg: "senha pequena",
          args: [6]
        } 
      },
      type: DataTypes.STRING,
      allowNull: false
    },
    cursoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};