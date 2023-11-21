const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");


class Toilet extends Model {}

Toilet.init(
  {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    tags: DataTypes.STRING,
    description: DataTypes.STRING,
    coords: DataTypes.JSON,
    images: DataTypes.STRING,
    reviews: DataTypes.STRING,
    openingTime: DataTypes.STRING,
    closingTime: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "toilet",
  }
);

module.exports = Toilet;
