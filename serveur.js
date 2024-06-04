const express = require('express');
const app = express();
const version = "v1";
const cors = require ("cors");
const PORT = process.env.PORT || 3000;
const { Sequelize } = require('sequelize');
const Blague = require('./models/Blagues');
const setupSwagger = require('./mildeware/swagger.js');

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors()); // Utilisation du middleware cors

// Routes
const jokesRoutes = require('./routes/routes.js');
app.use(`/api/${version}/blagues`, jokesRoutes);

// Intégration de Swagger
setupSwagger(app);

// Synchroniser la base de données et démarrer le serveur
const sequelize = Blague.sequelize;

sequelize.sync({ alter: true }) // Utilisez `{ force: true }` pour recréer la table à chaque fois. En production, utilisez `{ alter: true }`
  .then(async () => {
    console.log('La base de données et la table Blague ont été synchronisées.');

    // Ajouter des blagues initiales (commenté après la première insertion)
    /*
    await Blague.bulkCreate([
      { question: "Quelles est la femelle du hamster ?", reponse: "L'Amsterdam." },
      { question: "Que dit un oignon quand il se cogne ?", reponse: "Aie." },
      { question: "Quel est animal le plus heureux ?", reponse: "Le hibou, parce que sa femme est chouette." },
      { question: "Pourquoi le football c'est rigolo?", reponse: "Parce que Thierry en rit." },
      { question: "Quel est le sport le plus fruité?", reponse: "La boxe, parce que tu te prend des péches dans la poire et tu tombe dans la pommes." },
      { question: "Que se fait un Schtoumpf quand il tombe ?", reponse: "Un bleu." },
      { question: "Quel est le comble pour un marin ?", reponse: "Avoir le nez qui coule." },
      { question: "Qu'est ce que les enfant usent le plus a l'ecole ?", reponse: "Le professeur ." },
      { question: "Quel est le sport le plus silencieux ?", reponse: "Le para-chuut." },
      { question: "Quel est le comble pour un joueur de bowling ?", reponse: "C'est de perdre la boule." }
    ]);

    console.log('Blagues initiales ajoutées.');
    */

    // Démarrer le serveur après la synchronisation et l'ajout des blagues initiales
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation avec la base de données :', err);
  });
