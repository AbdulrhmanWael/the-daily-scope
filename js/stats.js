import { loadFooter, loadNavBar, loadSidebar } from "./index.js";

const topScorers = [
  {
    player_name: "Mohamed Salah",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/118748.png",
    team_name: "Liverpool",
    player_goals: 29,
  },
  {
    player_name: "Alexander Isak",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/219168.png",
    team_name: "Newcastle United",
    player_goals: 23,
  },
  {
    player_name: "Erling Haaland",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/223094.png",
    team_name: "Manchester City",
    player_goals: 22,
  },
  {
    player_name: "Bryan Mbeumo",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/446008.png",
    team_name: "Manchester United",
    player_goals: 20,
  },
  {
    player_name: "Chris Wood",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/60689.png",
    team_name: "Nottingham Forest",
    player_goals: 20,
  },
];

const topAssists = [
  {
    player_name: "Mohamed Salah",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/118748.png",
    team_name: "Liverpool",
    player_assists: 18,
  },
  {
    player_name: "Jacob Murphy",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/114243.png",
    team_name: "Newcastle United",
    player_assists: 12,
  },
  {
    player_name: "Anthony Elanga",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/449434.png",
    team_name: "Nottingham Forest",
    player_assists: 11,
  },
  {
    player_name: "Bukayo Saka",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/223340.png",
    team_name: "Arsenal",
    player_assists: 10,
  },
  {
    player_name: "Mikkel Damsgaard",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/440089.png",
    team_name: "Brentford",
    player_assists: 10,
  },
];

const topYellowCards = [
  {
    player_name: "Liam Delap",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/463034.png",
    team_name: "Manchester City",
    player_yellow_cards: 12,
  },
  {
    player_name: "Saša Lukić",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/212314.png",
    team_name: "Tottenham Hotspur",
    player_yellow_cards: 12,
  },
  {
    player_name: "Flynn Downes",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/220585.png",
    team_name: "West Ham United",
    player_yellow_cards: 12,
  },
];

const topRedCards = [
  {
    player_name: "Bruno Fernandes",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/141746.png",
    team_name: "Manchester United",
    player_red_cards: 3,
  },
  {
    player_name: "Myles Lewis-Skelly",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/499169.png",
    team_name: "Arsenal",
    player_red_cards: 3,
  },
  {
    player_name: "Jack Stephens",
    player_image:
      "https://resources.premierleague.com/premierleague25/photos/players/110x140/88900.png",
    team_name: "AFC Bournemouth",
    player_red_cards: 2,
  },
];

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
      <img src="${p.player_image}" alt="${p.player_name}" class="me-3 rounded" width="50" height="50">
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
  setTimeout(loadStats, 300);
});

loadFooter();
loadSidebar();
loadNavBar();
