'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Hero.belongsTo(sequelize.model('User'));
    }
  };
  Hero.init({
    antibodyStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hero',
  });
  return Hero;
};
