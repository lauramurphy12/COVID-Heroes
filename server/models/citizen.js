'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Citizen extends Model {
   
    static associate(models) {
      Citizen.belongsTo(sequelize.model('User'));
      Citizen.hasMany(sequelize.model('MissionPost'));
    }
  };
  Citizen.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    infectionStatus: DataTypes.ENUM('asymptomatic', 'contracted')
  }, {
    sequelize,
    modelName: 'Citizen',
  });
  // hooks: {
  //  Citizen.afterCreate(async(citizen, options) => {
   //         await sequelize.models.MissionPost.create({
        //        UserId: user.id
      //     })
   // });
  return Citizen;
};
