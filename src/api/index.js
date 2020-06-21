import axios from 'axios';

const url = "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";

export const getUpcomingMatch = async () => {
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: { 'X-Auth-Token': '984a4fda42cd4820be8c73fba4f53e7a' }
        });
        return { match: matches[0] };
    } catch (error) {

    }
}