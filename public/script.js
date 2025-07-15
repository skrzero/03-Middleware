const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  loadFilms();

  const form = document.getElementById("projection-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const filmId = parseInt(document.getElementById("filmId").value);
    const salle = document.getElementById("salle").value;
    const date_heure = document.getElementById("date_heure").value;

    const response = await fetch(`${API_URL}/projections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_film: filmId, salle, date_heure }),
    });

    if (response.ok) {
      showMessage("✅ Projection ajoutée !");
      form.reset();
    } else {
      showMessage("❌ Une erreur est survenue.");
    }
  });
});

async function loadFilms() {
  const response = await fetch(`${API_URL}/films`);
  const films = await response.json();
  const list = document.getElementById("films-list");
  const select = document.getElementById("filmId");

  films.forEach((film) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${film.titre} (${film.annee_sortie})`;
    list.appendChild(li);

    const option = document.createElement("option");
    option.value = film.id;
    option.textContent = film.titre;
    select.appendChild(option);
  });
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}
