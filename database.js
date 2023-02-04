const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Pages = sequelize.define('Page', {
    Name: DataTypes.STRING,
    Title: DataTypes.STRING,
    Route: DataTypes.STRING,
    EmbeddedHTML: DataTypes.TEXT,
});

try {
    sequelize.sync({ force: false });
    sequelize.authenticate();
    console.log('We`ve created simple SQLite database');
} catch(error) {
    console.log('There was an error connecting to the database');
}

module.exports = {Pages, sequelize};