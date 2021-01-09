'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MissionPost extends Model {
    
    static associate(models) {
       MissionPost.belongsTo(sequelize.model('Citizen'));
    }
  };
  MissionPost.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isActivePost: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MissionPost',
  });
  return MissionPost;
};
