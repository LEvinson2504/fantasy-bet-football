import axios from 'axios';

const url = "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";

export const getUpcomingMatches = async () => {
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a',

            }
        });
        let limitMatches = matches.slice(0, 9);
        return { limitMatches };
    } catch (error) {

    }
}

export const getTeamEmblemUrl = async (id) => {
    let url = `https://api.football-data.org/v2/teams/${id}`;
    // console.log(url);
    try {
        const { data } = await axios.get(url, {
            headers: {
                'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a',
                // 'Access-Control-Allow-Origin': 'https://api.football-data.org'
            }
        })
        console.log(data.crestURl);
        // return data.crestUrl;
    } catch (error) {

    }
}
