const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
