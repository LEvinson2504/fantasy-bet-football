import axios from 'axios';

const url = "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";

export const getUpcomingMatches = async () => {
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a',

            }
        });
        // let limitMatches = matches.slice(0, 9);
        return { matches };
    } catch (error) {

    }
}

