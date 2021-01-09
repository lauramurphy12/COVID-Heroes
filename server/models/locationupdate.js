'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locationUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        locationUpdate.belongsTo(sequelize.model('User'));
    }
    
  };
  locationUpdate.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    POINT: DataTypes.GEOMETRY
  }, {
    sequelize,
    modelName: 'locationUpdate',
  });
  return locationUpdate;
};
