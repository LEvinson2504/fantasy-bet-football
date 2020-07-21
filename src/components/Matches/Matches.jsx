import React, { useState, useEffect } from "react";
import { Match } from "../../components";
import { getUpcomingClMatches } from "../../api/index";

const Matches = ({ matches, handleBets, handleSubmit }) => {
  const [clMatches, setClMatches] = useState([]);

  useEffect(() => {
    async function getData() {
      getUpcomingClMatches().then((matches) =>
        setClMatches(matches.someMatches)
      );
    }
    getData();
  }, []);
  // const { matches } = matches;
  return (
    <div>
      <h3>Premier League</h3>
      {matches.someMatches.map((match) => (
        <Match
          key={match.id}
          match={match}
          handleBets={handleBets}
          handleSubmit={handleSubmit}
        />
      ))}

      <h3>Champions League</h3>
      {clMatches &&
        clMatches.map((match) => (
          <Match
            key={match.id}
            match={match}
            handleBets={handleBets}
            handleSubmit={handleSubmit}
          />
        ))}
      {/* <h1> match</h1> */}
      {/* <Match /> */}
    </div>
  );
};

export default Matches;
