import React from "react";
import { Match } from "../../components";

const Matches = ({ matches, handleBets, handleSubmit }) => {
  console.log(matches);
  // const { matches } = matches;
  return (
    <div>
      {matches.matches.map((match) => (
        <Match
          key={match.id}
          match={match}
          handleBets={handleBets}
          handleSubmit={handleSubmit}
        />
      ))}
      <h1> match</h1>
      {/* <Match /> */}
    </div>
  );
};

export default Matches;
