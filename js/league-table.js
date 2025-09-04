import { ALL_SPORTS_API_KEY } from "../apiKeys.js";
import { loadFooter, loadNavBar } from "./index.js";

const leagueId = 152;

function loadLeagueTable() {
  const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Standings&leagueId=${leagueId}&APIkey=${ALL_SPORTS_API_KEY}`;

  $.ajax({
    type: "get",
    dataType: "json",
    url: apiUrl,
    success: function (res) {
      console.log(res);

      if (!res.result || !res.result.total) return;

      const standings = res.result.total;
      const container = $("#league-table");
      container.html("");

      // Build table header
      const tableHeader = `
        <table class="table table-striped table-bordered text-center">
          <thead class="table-dark">
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody id="league-table-body"></tbody>
        </table>
      `;
      container.append(tableHeader);

      const tbody = $("#league-table-body");
      standings.forEach((team) => {
        const row = `
          <tr>
            <td>${team.standing_place}</td>
            <td class="d-flex align-items-center gap-2">
              <img src="${team.team_logo}" alt="${team.standing_team}" width="30" height="30" class="rounded">
              ${team.standing_team}
            </td>
            <td>${team.standing_P}</td>
            <td>${team.standing_W}</td>
            <td>${team.standing_D}</td>
            <td>${team.standing_L}</td>
            <td>${team.standing_F}</td>
            <td>${team.standing_A}</td>
            <td>${team.standing_GD}</td>
            <td>${team.standing_PTS}</td>
          </tr>
        `;
        tbody.append(row);
      });
    },
    error: function (err) {
      console.error(err);
      $("#league-table").html(
        "<p class='text-danger'>Failed to load league table</p>"
      );
    },
  });
}

$(document).ready(function () {
  setTimeout(() => {
    loadLeagueTable();
  }, 300);
});
