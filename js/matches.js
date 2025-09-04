import { ALL_SPORTS_API_KEY } from "../apiKeys.js";
import { loadFooter, loadNavBar } from "./index.js";

const apiKey = ALL_SPORTS_API_KEY;
const leagueId = 152;

let allMatches = [];

function loadMatches() {
  const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagueId}&from=2024-08-01&to=2025-06-30&APIkey=${apiKey}`;

  $.ajax({
    type: "get",
    dataType: "json",
    url: apiUrl,
    success: function (result) {
      allMatches = result.result || [];
      renderMatches(allMatches);
    },
    error: function (err) {
      $("#upcomingMatches").html(
        "<p class='text-danger'>Error loading matches</p>"
      );
      $("#pastMatches").html("");
      console.log(err);
    },
  });
}

function renderMatches(matches) {
  const now = new Date();
  $("#upcomingMatches").html("");
  $("#pastMatches").html("");

  matches.forEach((res) => {
    const matchDate = new Date(`${res.event_date} ${res.event_time}`);
    const matchHTML = `
      <div class='col-12'>
        <div class='match p-3 shadow-sm text-center'>
          <div class="d-flex justify-content-center align-items-center mb-2">
            <div class="me-3 d-flex flex-column align-items-center">
              <img src="${res.home_team_logo || ""}" alt="${
      res.event_home_team
    }" style="height:40px;">
              <span>${res.event_home_team}</span>
            </div>
            <div class="mx-3 fw-bold">VS</div>
            <div class="ms-3 d-flex flex-column align-items-center">
              <img src="${res.away_team_logo || ""}" alt="${
      res.event_away_team
    }" style="height:40px;">
              <span>${res.event_away_team}</span>
            </div>
          </div>
          <p><i class="bi bi-calendar-event"></i> ${res.event_date} 
             <i class="bi bi-clock ms-2"></i> ${res.event_time}</p>
          <p><i class="bi bi-geo-alt"></i> ${res.event_stadium}</p>
          <p><i class="bi bi-trophy"></i> Result: ${res.event_final_result}</p>
        </div>
      </div>
    `;
    if (matchDate > now) {
      $("#upcomingMatches").append(matchHTML);
    } else {
      $("#pastMatches").append(matchHTML);
    }
  });
}

function filterMatches() {
  const teamName = $("#teamFilter").val().toLowerCase();
  const date = $("#dateFilter").val();

  const filtered = allMatches.filter((match) => {
    const home = match.event_home_team.toLowerCase();
    const away = match.event_away_team.toLowerCase();
    const matchDate = match.event_date;

    const teamMatch =
      !teamName || home.includes(teamName) || away.includes(teamName);
    const dateMatch = !date || matchDate === date;

    return teamMatch && dateMatch;
  });

  renderMatches(filtered);
}

$("#filterBtn").on("click", filterMatches);

loadMatches();
