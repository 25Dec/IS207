
/*export function destroy() {

}

export function update(update, param2) {
    
}

export function findAndCountAll(param) {
    
}

export function findOne(param) {
    
}

export function create(messageData) {
    
}
*/

const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let Message = MySequelize.define('message', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    content: {
      type: Sequelize.STRING(256),
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
    {
        underscored: false,
        timestamps: false,
        //updatedAt: false,
        //createdAt: false,
        includeDeleted: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'message'
    });
module.exports = Message;