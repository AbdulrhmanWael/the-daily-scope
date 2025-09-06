import { loadFooter, loadNavBar, loadSidebar } from "./index.js";

let topScorers = [];
let topAssists = [];
let topYellowCards = [];
let topRedCards = [];

async function fetchStats() {
  try {
    const res = await fetch(
      "https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=152&APIkey=2dd00d8f167c46a0ba3cbb154eceb4dbaffab5ad7da7edff7b8ed4fad5595ba0"
    );
    const data = await res.json();

    const allPlayers = data.result.flatMap((team) =>
      team.players.map((p) => ({
        ...p,
        team_name: team.team_name,
      }))
    );

    topScorers = allPlayers
      .filter((p) => +p.player_goals > 0)
      .sort((a, b) => +b.player_goals - +a.player_goals)
      .slice(0, 10);

    topAssists = allPlayers
      .filter((p) => +p.player_assists > 0)
      .sort((a, b) => +b.player_assists - +a.player_assists)
      .slice(0, 10);

    topYellowCards = allPlayers
      .filter((p) => +p.player_yellow_cards > 0)
      .sort((a, b) => +b.player_yellow_cards - +a.player_yellow_cards)
      .slice(0, 10);

    topRedCards = allPlayers
      .filter((p) => +p.player_red_cards > 0)
      .sort((a, b) => +b.player_red_cards - +a.player_red_cards)
      .slice(0, 10);

    loadStats();
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

function loadStats() {
  renderList("scorers-list", topScorers, "player_goals");
  renderList("assists-list", topAssists, "player_assists");
  renderList("yellow-list", topYellowCards, "player_yellow_cards");
  renderList("red-list", topRedCards, "player_red_cards");

  setupSorting("scorers-sort", "scorers-list", topScorers, "player_goals");
  setupSorting("assists-sort", "assists-list", topAssists, "player_assists");
  setupSorting(
    "yellow-sort",
    "yellow-list",
    topYellowCards,
    "player_yellow_cards"
  );
  setupSorting("red-sort", "red-list", topRedCards, "player_red_cards");
}

function renderList(containerId, items, statKey, order = "desc") {
  const FALLBACK_IMG =
    "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
  const container = document.getElementById(containerId);
  if (!container) return;

  const sorted = [...items].sort((a, b) =>
    order === "asc" ? +a[statKey] - +b[statKey] : +b[statKey] - +a[statKey]
  );

  container.innerHTML = "";

  sorted.forEach((p) => {
    const row = document.createElement("div");
    row.className = "list-group-item d-flex align-items-center";

    row.innerHTML = `
      <img
    src="${p.player_image || FALLBACK_IMG}"
    onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"
    alt="${p.player_name}"
    class="me-3 rounded"
    width="50" height="50"
  >
      <div>
        <strong>${p.player_name}</strong> <br>
        <small>${p.team_name}</small>
      </div>
      <span class="ms-auto fw-bold">${p[statKey]}</span>
    `;

    container.appendChild(row);
  });
}

function setupSorting(selectId, containerId, items, statKey) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.addEventListener("change", () => {
    renderList(containerId, items, statKey, select.value);
  });
}

$(document).ready(function () {
  fetchStats();
});

loadFooter();
loadSidebar();
loadNavBar();
