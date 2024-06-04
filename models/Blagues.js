const { Sequelize, DataTypes } = require('sequelize');

// Configuration de la connexion à la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './DB/database.sqlite' // Chemin de stockage de votre fichier de base de données SQLite
});

// Définition du modèle Blague
const Blagues = sequelize.define('Blagues', {
  question: {
    type: DataTypes.STRING,
  },
  reponse: {
    type: DataTypes.STRING,
  }
});

module.exports = Blagues;
