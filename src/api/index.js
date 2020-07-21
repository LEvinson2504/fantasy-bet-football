import axios from 'axios';


export const getUpcomingMatches = async () => {
    const url = "https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN,

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
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN,
            }
        })
        // console.log("url: ", crestUrl);
        return crestUrl;
    } catch (error) {
        console.log(error);
    }
}

export const getMatchDetails = async (id) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/matches/${id}`;
    try {
        const { data: { match } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN,
            }
        });
        // console.log("matches: ", { someMatches })
        return match;
    } catch (error) {
        console.log(error);
    }
}

export const getLatesNews = async () => {
    const url = `https://cors-anywhere.herokuapp.com/https://levinson-fantasy-football.herokuapp.com/news`;
    try {
        const { data } = await axios.get(url, {});
        // console.log("news: ", data)
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const getUpcomingClMatches = async () => {
    const url = "https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED";
    try {
        const { data: { matches } } = await axios.get(url, {
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN,

            }
        });
        let someMatches = matches.slice(0, 3);
        console.log("CL matches: ", { someMatches })
        return { someMatches };
    } catch (error) {

    }
}