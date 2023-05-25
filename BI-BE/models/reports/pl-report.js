const { Sequelize } = require("sequelize");
const sequelize = require("../../utils/database");

const PlReport = sequelize.define("pl-report", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  // user: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
});

module.exports = PlReport;
