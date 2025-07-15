# 🎬 TP 2 – Gestion des erreurs avec Express et Node.js

Bienvenue dans la **deuxième partie** de votre projet CineClub.  
Dans le TP précédent, vous avez implémenté le **CRUD** sur les films à l’aide de routes Express.  

🎯 **Objectif de ce TP** : améliorer la robustesse de votre API en identifiant **toutes les sources potentielles d’erreurs** et en les gérant proprement.

---

## ✅ Objectifs pédagogiques

- Comprendre les différents types d’erreurs côté serveur
- Savoir quand renvoyer les bons codes HTTP (400, 404, 500…)
- Mettre en place une gestion d'erreurs centralisée (middleware)
- Rendre l’API plus sûre et plus claire pour les utilisateurs

---

## 📁 Structure du projet

```bash
.
├── data/
│   ├── films.json
│   ├── realisateurs.json
│   └── projections.json
├── server.js
└── README.md
```
## 🔍 Ce que vous devez faire

### PARTIE 1

Dans `server.js`, vous devez revoir toutes les routes que vous avez créées dans le TP précédent pour :
1. 🔢 Vérifier les paramètres d’URL

    Si :id n’est pas un nombre valide, retournez 400 Bad Request.

    Si un id est demandé mais introuvable dans la liste, retournez 404 Not Found.

2. 📦 Vérifier les corps de requêtes (req.body)

    Si un champ obligatoire est manquant ou vide dans un POST ou PATCH, retournez 400 Bad Request.

3. 📂 Gérer les erreurs de lecture ou d’écriture de fichier

    Entourez vos appels à fs.writeFile ou fs.writeFileSync avec une gestion d’erreurs.

    En cas de problème disque ou JSON invalide, retournez 500 Internal Server Error.

### PARTIE 2

4. 🧰 Créer un middleware de gestion d’erreurs

Ajoutez en bas de votre fichier server.js :

```js
app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});
```
Utilisez next(err) dans vos routes pour déclencher ce middleware si besoin.
Nous allons remplacer les `res.status(500)` par `next(err)`


5. 0️⃣ Créer un middleware pour vérifier les id

    Si les id ne sont pas des chiffres entiers, alors l'exécution ne doit pas aller plus loin. Nous allons créer un middleware `const validateId` pour vérifier le paramètre id de nos requêtes que nous enverrons en paramètre à la route `GET /films/:id` . 

    Pour vérifier si le paramètre est un chiffre utilisez `if (isNaN(filmId))`, s'il n'est pas valide retourner une erreur 400. 

    N'oubliez pas de renvoyer le paramètre filmId à la requête. 

6. 🚫  Middleware de rattrapage 404

    Si la route recherchée n'est pas spécifiée, on voudrait retourner une erreur 404. 
    Attention ce middleware doit être placé à la fin pour être sûr qu'aucune route n'ait en effet pu être prise. 

## 🧪 Exemples de tests à faire

- Supprimer un film avec un id inexistant
- Ajouter un film sans titre
- Modifier le titre avec un corps vide
- Appeler une route avec un id invalide : /films/abc
- Corrompre volontairement le fichier JSON pour tester l’erreur d’écriture
- Supprimer un film déjà supprimé


## 🧠 Bonnes pratiques à respecter

- Toujours vérifier la validité des entrées utilisateur
- Ne jamais supposer que le fichier JSON est intact
- Ne pas laisser votre API planter en cas d’erreur
- Utiliser les bons codes HTTP pour chaque cas


## À la fin de ce TP, votre API CineClub doit :

- Gérer toutes les erreurs prévisibles
- Renvoyer des réponses cohérentes et claires
- Ne jamais crasher, même si les données sont mauvaises