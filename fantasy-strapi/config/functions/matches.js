const axios = require("axios");

// function to store a match
async function storeMatch(match){
  await strapi.query("match").create({
    matchId: match.id,
    matchDay: match.matchday,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    score: match.score,
  });
}

module.exports = async () => {
  const url =
    "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";
  try {
    const {
      data: { matches },
    } = await axios.get(url, {
      headers: {
        "X-Auth-Token": "984a4fda42cd4820be8c73fba4f53e7a",
      },
    });
    // shorten matches
    const matchesToStore = matches.slice(0, 10);

    console.log(matchesToStore.length);
    // store each match in db
    matchesToStore.forEach(match => {
      console.log(`storing ${match.id}`);
      storeMatch(match);
    });
    // console.log(match);
    // storeMatch(match);
    // await strapi.query("match").create({
    //   matchId: match.id,
    //   matchDay: match.matchday,
    //   homeTeam: match.homeTeam,
    //   awayTeam: match.awayTeam,
    //   score: match.score,
    // });
  } catch(e){
    // how do we handle the errors?
    console.log(e);
  }
};
