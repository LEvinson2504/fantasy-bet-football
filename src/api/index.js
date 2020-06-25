import axios from 'axios';

const url = "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";

export const getUpcomingMatches = async () => {
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a',

            }
        });
        let someMatches = matches.slice(0, 3);
        // console.log("matches: ", { someMatches })
        return { someMatches };
    } catch (error) {

    }
}

export const getTeamEmblemUrl = async (id) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/teams/${id}`;
    try {
        const { data: { crestUrl } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a',
            }
        })
        console.log("url: ", crestUrl);
        return crestUrl;
    } catch (error) {
        console.log(error);
    }
}

