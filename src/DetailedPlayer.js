export const DetailedPlayer = updateSquad => player => {
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
      <h1>{player.name}</h1>
      <h3>{player.number}</h3>
      <h3>TOTAL POINTS: {Total}</h3>
      <h3>ATTACK: {AttackPoints}</h3>
      <input type="checkbox" />
      <div>
        <h4>Minutes Played: {player.stats.minutes_played_total}</h4>
        <h4>Metres Made: {player.stats.carries_metres}</h4>
        <h4>Support Caries: {player.stats.carries_support}</h4>
        <h4>Clean Breaks: {player.stats.clean_breaks}</h4>
        <h4>Defenders Beaten: {player.stats.defenders_beaten}</h4>
        <h4>Gain Line: {player.stats.gain_line}</h4>
        <h4>Offload: {player.stats.offload}</h4>
        <h4>Retained Kicks: {player.stats.retained_kicks}</h4>
        <h4>Runs: {player.stats.runs}</h4>
        <h4>Tries: {player.stats.tries}</h4>
        <h4>Try Assists: {player.stats.try_assist}</h4>
        <h4>Restarts Won: {player.stats.restarts_won}</h4>
        <h4>
          Carries Not to Gain Line: {player.stats.carries_not_made_gain_line}
        </h4>
      </div>
      <h3>DEFENSE: {DefencePoints}</h3>
      <input type="checkbox" />
      <div>
        <h4>Tackles:{player.stats.tackles}</h4>
        <h4>Tackles Missed:{player.stats.missed_tackles}</h4>
        <h4>Turnovers:{player.stats.turnover_won}</h4>
        <h4>Turnover Conceded:{player.stats.turnovers_conceded}</h4>
        <h4>Pickups:{player.stats.pickup}</h4>
      </div>
      <h3>HANDLING: {HandlingPoints}</h3>
      <input type="checkbox" />
      <div>
        <h4>Passes: {player.stats.passes}</h4>
        <h4>Bad Passes:{player.stats.bad_passes}</h4>
        <h4>Kick Retained:{player.stats.catch_from_kick}</h4>
        <h4>Collection Failed:{player.stats.collection_failed}</h4>
        <h4>Interception:{player.stats.collection_interception}</h4>
        <h4>In-Loose Pickup:{player.stats.collection_loose_ball}</h4>
        <h4>Dropped Catch:{player.stats.dropped_catch}</h4>
        <h4>Handling Error:{player.stats.handling_error}</h4>
      </div>
      <h3>INFRINGEMENT: {Ingfringement}</h3>
      <input type="checkbox" />
      <div>
        <h4>Free Kicks Conceded: {player.stats.total_free_kicks_conceded}</h4>
        <h4>Penalties Conceded: {player.stats.penalties_conceded}</h4>
        <h4>Yellow Cards Conceded: {player.stats.yellow_cards}</h4>
        <h4>Red Cards Conceded: {player.stats.red_cards}</h4>
      </div>
      <h3>KICKING:{Kicking}</h3>
      <input type="checkbox" />
      <div>
        <h4>Conversions: {player.stats.conversion_goals}</h4>
        <h4>Missed Conversions: {player.stats.missed_conversion_goals}</h4>
        <h4>Penalties: {player.stats.kick_penalty_good}</h4>
        <h4>Missed Penalties: {player.stats.missed_penalty_goals}</h4>
        <h4>Drop Goals: {player.stats.drop_goals_converted}</h4>
        <h4>Missed Drop Goals: {player.stats.drop_goal_missed}</h4>
        <h4>Kicked Metres: {player.stats.kick_metres}</h4>
        <h4>Kick Leading to Try: {player.stats.try_kicks}</h4>
      </div>
      <h3>RUCKS & MAULS: {RucksMauls}</h3>
      <input type="checkbox" />
      <div>
        <h4>Mauls Won: {player.stats.mauls_won}</h4>
        <h4>Mauls Lost: {player.stats.mauls_lost}</h4>
        <h4>Rucks Won: {player.stats.rucks_won}</h4>
        <h4>Rucks Lost: {player.stats.rucks_lost}</h4>
      </div>
      <h3>SCRUM & LINEOUT:{ScrumLinout}</h3>
      <input type="checkbox" />
      <div>
        <h4>Scrum Won: {player.stats.scrums_won_outright}</h4>
        <h4>Scrum Lost: {player.stats.scrums_lost_outright}</h4>
        <h4>Lineout Won (Steal): {player.stats.lineout_won_steal}</h4>
        <h4>Linout Won (Own): {player.stats.lineout_won_own_throw}</h4>
        <h4>Lineout Won (Opp): {player.stats.lineout_won_opp_throw}</h4>
        <h4>Lineout Lost: {player.stats.lineouts_lost}</h4>
        <h4>
          Lineout Lost (Stright):{player.stats.lineout_throw_lost_not_straight}
        </h4>
      </div>
    </li>
  );
};
