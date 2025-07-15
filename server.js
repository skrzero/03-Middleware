const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Charger les fichiers de données
const films = require('./data/films.json');
const projections = require('./data/projections.json');
const realisateurs = require('./data/realisateurs.json');

// app.use(express.static("public"));

// Route d'accueil
app.get('/', (req, res) => {
    res.send('🎬 Bienvenue au CineClub API !');
});

// GET /films — tous les films
    app.get('/films', (req, res) => {
        res.json(films);
    });

// GET /realisateurs
    app.get('/realisateurs', (req, res) => {
        res.json(realisateurs);
    });


// GET /films/:id — détail d'un film
app.get('/films/:id', (req, res) => {
    const filmId = parseInt(req.params.id);
    const film = films.find(f => f.id === filmId);
    res.json(film)
});

//DELETE /film/:id - Supression d'un film
app.delete('/films/:id', (req, res) => {
    const filmId = parseInt(req.params.id);  
    const newListFilms = films.splice(filmId-1, 1);
    
    const dataPath = path.join(__dirname, 'data', 'films.json');
    fs.writeFileSync(dataPath, JSON.stringify(newListFilms))
    res.status(204).end();
})

newFilm = {
    "id": 6,
    "titre": "Le Parfum de la Dame en Noir",
    "annee_sortie": 2005,
    "duree_minutes": 115,
    "note_critique": 7.4,
    "pays_origine": "France",
    "id_realisateur": 3
}

// POST /film - Ajout d'un film
app.post('/films', (req, res) => {
    const nouveauFilm = req.body;
    
    films.push(nouveauFilm);
    
    const dataPath = path.join(__dirname, 'data', 'films.json');
    fs.writeFileSync(dataPath, JSON.stringify(films))
    res.status(201).json({ message: "Film ajouté avec succès", film: nouveauFilm });
})


const titre = 
{
    "titre": "Nouveau Titre du Film"
};
// PATCH /films/:id - Modification d'un titre de film 
app.patch('/films/:id', (req, res) => {
    const filmId = parseInt(req.params.id);
    const { titre } = req.body;

    const index = filmId-1
    films[index].titre = titre;

    fs.writeFileSync(dataPath, JSON.stringify(films))
    res.status(200).json({ message: "Film mis à jour avec succès", film: films[index] });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎥 Serveur CineClub démarré sur http://localhost:${PORT}`);
});

