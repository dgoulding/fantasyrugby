import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./data.json";
const db = window.firebase.firestore();

// console.log(data.RRML.TeamDetail.Team[1]);
// console.log(data.RRML.TeamDetail.Team[1].Player[0]);
// console.log(
//   data.RRML.TeamDetail.Team[1].Player[0].PlayerStats.PlayerStat[0][
//     "-restart_opp_player"
//   ]
// );

const forwardscount = squad =>
  squad.filter(
    player => parseInt(player.number) >= 1 && parseInt(player.number) <= 8
  ).length;

const backscount = squad =>
  squad.filter(
    player => parseInt(player.number) >= 11 && parseInt(player.number) <= 15
  ).length;

const scrumhalfcount = squad =>
  squad.filter(player => parseInt(player.number) === 9).length;

const flyhalfcount = squad =>
  squad.filter(player => parseInt(player.number) === 10).length;

const subscount = squad =>
  squad.filter(player => parseInt(player.number) >= 16).length;

const prettifyTeam = team => {
  return {
    id: parseInt(team["-team_id"], 10),
    name: team["-team_name"],
    at_home: team["-home_or_away"],
    players: team.Player.map(player => ({
      id: parseInt(player["-id"], 10),
      name: player["-player_name"],
      position: player["-position"],
      number: player["-position_id"],
      stats: player.PlayerStats.PlayerStat.reduce(
        (all, stat) => ({
          ...all,
          [Object.keys(stat)[0].replace("-", "")]: parseInt(
            Object.values(stat)[0],
            10
          )
        }),
        {}
      )
    }))
  };
};

const example = prettifyTeam(data.RRML.TeamDetail.Team[0]);
console.log("Example pretty team", example);

const Player = updateSquad => player => {
  const AttackPoints =
    player.stats.minutes_played_total +
    player.stats.carries_metres +
    player.stats.carries_support * 5 +
    player.stats.clean_breaks * 7 +
    player.stats.defenders_beaten * 7 +
    player.stats.gain_line * 5 +
    player.stats.offload * 5 +
    player.stats.retained_kicks * 5 +
    player.stats.runs * 5 +
    player.stats.tries * 10 +
    player.stats.try_assist * 2 +
    player.stats.restarts_won * 5 +
    player.stats.carries_not_made_gain_line;

  const DefencePoints =
    player.stats.tackles * 3 +
    player.stats.missed_tackles +
    player.stats.turnover_won * 5 +
    player.stats.turnovers_conceded +
    player.stats.pickup * 5;

  const HandlingPoints =
    player.stats.passes * 2 +
    -player.stats.bad_passes * 10 +
    player.stats.collection_from_kick * 10 +
    -player.stats.collection_failed * 10 +
    player.stats.collection_interception * 15 +
    player.stats.collection_loose_ball * 5 +
    -player.stats.dropped_catch * 10 +
    -player.stats.handling_error * 10;

  const Ingfringement =
    -player.stats.total_free_kicks_conceded * 10 +
    -player.stats.penalties_conceded * 20 +
    -player.stats.yellow_cards * 30 +
    -player.stats.red_cards * 60;

  const Kicking =
    player.stats.conversion_goals * 5 +
    -player.stats.missed_conversion_goals * 5 +
    player.stats.kick_penalty_good * 5 +
    -player.stats.kick_penalty_bad * 5 +
    player.stats.drop_goals_converted * 5 +
    -player.stats.drop_goal_missed * 5 +
    player.stats.kick_metres +
    player.stats.try_kicks * 10;

  const RucksMauls =
    player.stats.mauls_won +
    player.stats.mauls_lost +
    player.stats.rucks_won +
    player.stats.rucks_lost;

  const ScrumLinout =
    player.stats.scrums_won_outright * 30 +
    -player.stats.scrums_lost_outright * 30 +
    player.stats.lineout_won_steal * 20 +
    player.stats.lineout_won_own_throw * 5 +
    player.stats.lineout_won_opp_throw * 10 +
    -player.stats.lineouts_lost * 10;

  const Total =
    AttackPoints +
    DefencePoints +
    HandlingPoints +
    Ingfringement +
    Kicking +
    RucksMauls +
    ScrumLinout;

  return (
    <li>
      <button onClick={e => updateSquad(player)}>Add to Squad set </button>
      <h1>
        {player.name} ({player.number})
      </h1>
      <h3>TOTAL POINTS: {Total}</h3>
      <h4>ATTACK: {AttackPoints}</h4>
      <h4>DEFENSE: {DefencePoints}</h4>
      <h4>HANDLING: {HandlingPoints}</h4>
      <h4>INFRINGEMENT: {Ingfringement}</h4>
      <h4>KICKING:{Kicking}</h4>
      <h4>RUCKS & MAULS: {RucksMauls}</h4>
      <h4>SCRUM & LINEOUT:{ScrumLinout}</h4>
    </li>
  );
};

const SimplePlayer = updateSquad => player => {
  return (
    <li>
      {player.name} ({player.number}){" "}
      <button onClick={e => updateSquad(player)}> Remove </button>
    </li>
  );
};

class App extends Component {
  state = {
    home: prettifyTeam(data.RRML.TeamDetail.Team[1]),
    away: prettifyTeam(data.RRML.TeamDetail.Team[0]),
    squad: []
  };

  actions = {
    updateSquad: player => {
      console.log("Adding", player, "to", this.state.squad);

      const exists = this.state.squad.filter(
        selection => selection.id === player.id
      );

      let newSquad;
      if (exists.length > 0) {
        newSquad = this.state.squad.filter(
          selection => selection.id !== player.id
        );
      } else {
        newSquad = this.state.squad.concat(player);
      }

      const forwards = forwardscount(newSquad);

      const backs = backscount(newSquad);

      const scrumhalf = scrumhalfcount(newSquad);

      const flayhalf = flyhalfcount(newSquad);

      const subs = subscount(newSquad);

      if (
        newSquad.length <= 11 &&
        forwards <= 4 &&
        backs <= 3 &&
        scrumhalf <= 1 &&
        flayhalf <= 1 &&
        subs <= 2
      ) {
        db.collection("squads")
          .doc("z2gE56YNdYZzbmycc4UD")
          .set({
            creator: "BigD",
            squad: newSquad
          });

        this.setState({
          squad: newSquad
        });
      }
    }
  };

  componentDidMount() {
    db.collection("squads")
      .doc("z2gE56YNdYZzbmycc4UD")
      .onSnapshot(snap => {
        this.setState({ squad: snap.data().squad });
      });
  }

  render() {
    return (
      <main>
        <article>
          <h1>HOME: {this.state.home.name}</h1>
          <ul>
            {this.state.home.players.map(Player(this.actions.updateSquad))}
          </ul>
          <h1>AWAY: {this.state.away.name}</h1>
          <ul>
            {this.state.away.players.map(Player(this.actions.updateSquad))}
          </ul>
        </article>
        <aside>
          <h3>MY SQUAD</h3>
          <h5>SELECT:</h5>
          <h4>Forwards: {4 - forwardscount(this.state.squad)}</h4>
          <h4>Backs: {3 - backscount(this.state.squad)}</h4>
          <h4>Scrumhalf: {1 - scrumhalfcount(this.state.squad)}</h4>
          <h4>Flyhalf: {1 - flyhalfcount(this.state.squad)}</h4>
          <h4>Subs: {2 - subscount(this.state.squad)}</h4>

          {this.state.squad.map(SimplePlayer(this.actions.updateSquad))}
        </aside>
      </main>
    );
  }
}

export default App;
