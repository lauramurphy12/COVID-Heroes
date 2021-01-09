'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(sequelize.model('Citizen'));
        User.hasMany(sequelize.model('locationUpdate'));
    }
  };
  User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userType: {
        type: DataTypes.ENUM,
        values: ['citizen', 'hero', 'admin']
    },
    username: DataTypes.STRING,
    password: {
        type: DataTypes.VIRTUAL(DataTypes.STRING),
    },
    passwordHash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  hooks: {
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(user.password, salt);
    }); 
    User.afterCreate(async(user, options) => {
        if(user.userType == '1'){
            await sequelize.models.Citizen.create({
                UserId: user.id
           })
        }else{
            await sequelize.models.Hero.create({
                UserId: user.id
           }) 
        }
    });

        //else{
         //   models.Hero.create({
                
         //   }); 
       // }
  }
  return User;
};
