const Blague = require('../models/Blagues');

// Contrôleur pour récupérer toutes les blagues
exports.getAllJokes = async (req, res) => {
  try {
    const blagues = await Blague.findAll();
    res.json(blagues);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des blagues", error });
  }
};

// Contrôleur pour récupérer une blague par ID
exports.getJokeById = async (req, res) => {
  try {
    const blagueId = parseInt(req.params.id);
    const blague = await Blague.findByPk(blagueId);

    if (!blague) {
      res.status(404).json({ message: "Blague non trouvée" });
    } else {
      res.json(blague);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la blague", error });
  }
};

// Contrôleur pour récupérer une blague au hasard
exports.getRandomJoke = async (req, res) => {
  try {
    const count = await Blague.count();
    const randomIndex = Math.floor(Math.random() * count);
    const blagues = await Blague.findAll({ offset: randomIndex, limit: 1 });
    const randomBlague = blagues[0];

    res.json(randomBlague);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la blague au hasard", error });
  }
};

// Contrôleur pour ajouter une nouvelle blague
exports.addJoke = async (req, res) => {
  try {
    const { question, reponse } = req.body;
    const newBlague = await Blague.create({ question, reponse });
    res.status(201).json(newBlague);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la blague", error });
  }
};
