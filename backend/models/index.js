'use strict';

// configuration et sécurisation de la base de données

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
    2 if (process.env.DATABASE_URL) {
    3   // En production sur Render
    4   sequelize = new Sequelize(process.env.DATABASE_URL, {
    5     dialect: 'mysql',
    6     protocol: 'mysql',
    7     dialectOptions: {
    8       ssl: {
    9         require: true,
   10         rejectUnauthorized: false
   11       }
   12     }
   13   });
   14 } else {
   15   // En local
   16   sequelize = new Sequelize(
   17     config.database,
   18     config.username,
   19     config.password,
   20     config
   21   );
   22 }

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
