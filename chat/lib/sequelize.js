const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
})

try {
  sequelize.authenticate()
  console.log('Connection has been established succesfully')
} catch (error) {
  console.log('Unable to connect to the database: ', error)
}

module.exports = sequelize
