const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index.js');

class Employee extends Model {
// data goes into this
// this.first_name
// this.last_name
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        manager_id: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'employee', 
    }
);

module.exports = Employee;