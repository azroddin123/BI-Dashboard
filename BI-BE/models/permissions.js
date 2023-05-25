const { Sequelize } = require('sequelize');
const sequalize = require("../utils/database");
const User = require('./user');


const Permission = sequalize.define("permission",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique : true
        // references: {
        //     model: 'User',
        //     key: 'id'
        //   }
    },
    is_pl_read : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    is_pl_write : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
})


module.exports = Permission;