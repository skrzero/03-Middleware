const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Charger les fichiers de données
const films = require('./data/films.json');
const projections = require('./data/projections.json');
const realisateurs = require('./data/realisateurs.json');
const { stringify } = require('querystring');

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
    if(isNaN(filmId)){
        res.status(400);
        res.send('bad request');
    };
    const film = films.find(f => f.id === filmId);
    if (!film){
        res.status(404);
        res.send('not found');
    } else {
        res.json(film);
    }
    
});

//DELETE /film/:id - Supression d'un film
app.delete('/films/:id', (req, res) => {
    const filmId = parseInt(req.params.id);
    if(isNaN(filmId)){
        res.status(400);
        res.send('bad request');
    };
    if (!filmId){
        res.status(404);
        res.send('not found');
    };
    films.splice(filmId-1, 1);
    
    const dataPath = path.join(__dirname, 'data', 'films.json');
    fs.writeFileSync(dataPath, JSON.stringify(films))
    res.status(204).end();
});

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
    if(!req.body.titre){
        res.status(400).send('bad request');
    };
    
    films.push(nouveauFilm);
    
    const dataPath = path.join(__dirname, 'data', 'films.json');
    try{
        fs.writeFileSync(dataPath, JSON.stringify(films))
        res.status(201).json({ message: "Film ajouté avec succès", film: nouveauFilm });
    } catch (error){
        res.status(500).send('internal error');
    }
})


const titre = 
{
    "titre": "Nouveau Titre du Film"
};
// PATCH /films/:id - Modification d'un titre de film 
app.patch('/films/:id', (req, res) => {
    const filmId = parseInt(req.params.id);
    const titre  = req.body.titre;

    const film = films.find(f => f.id === filmId);
    
    films.forEach((element,i)=>{
        if(element.id === filmId){
            films[i].titre = titre;

        }
    });

    const dataPath = path.join(__dirname,"data/films.json");
    fs.writeFileSync(dataPath, JSON.stringify(films));
    res.status(200).json({ message: "Film mis à jour avec succès", film: film });
});

// app.use((err, req, res, next) => {
//   console.error("Erreur attrapée :", err.stack);
//   res.status(500).json({ message: "Erreur interne du serveur" });
// });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎥 Serveur CineClub démarré sur http://localhost:${PORT}`);
});

