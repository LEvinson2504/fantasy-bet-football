import React, { useState, useEffect } from "react";
import moment from "moment";

import styles from "./Match.module.css";
import {
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { getTeamEmblemUrl } from "../../api";

// const TeamEmblem = ({ id }) => {
//   const [url, setUrl] = useState("");
//   useEffect(
//     () => async () =>
//       getTeamEmblemUrl(id).then((fetchedUrl) => setUrl(fetchedUrl)),
//     [url, id]
//   );
//   return <img src={url} alt="team" />;
// };
// let emblemUrl = "";
// getTeamEmblemUrl(64).then((url) => (emblemUrl = url));

const Match = ({ match, handleBets, handleSubmit }) => {
  const [home, setHome] = React.useState({ goals: 0, name: "" });
  const [away, setAway] = React.useState({ goals: 0, name: "" });
  const [name, setName] = React.useState("");

  function handleHomeChange(e) {
    setHome({ goals: e.target.value, name: homeTeam });
    console.log(home);
  }

  function handleAwayChange(e) {
    setAway({ goals: e.target.value, name: awayTeam });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleClick() {
    // needs work here
    handleBets({ name, id, home, away });
    handleSubmit();
    setHome("");
    setName("");
    setAway("");
    // console.log(match);
    alert("Done!");
  }

  // time for fixture
  const timeToMatch = moment(match.utcDate).fromNow();
  const { homeTeam, awayTeam, status, season, id } = match;

  return (
    <div className={styles.container}>
      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardContent>
              <Typography variant="h4">
                {/* <TeamEmblem id={homeTeam.id} /> */}
                {/* <img src={emblemUrl} alt="" /> */}
                {homeTeam.name} vs {awayTeam.name} ({status}) - wk
                {season.currentMatchday}
              </Typography>
            </CardContent>
            <CardContent>{timeToMatch}</CardContent>
          </Grid>

          <Grid item xs={2}>
            <CardContent>
              <InputLabel id="home-team-bet">home team</InputLabel>
              <Select
                labelId="home-team-bet"
                value={home.goals}
                onChange={handleHomeChange}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </CardContent>
          </Grid>

          <Grid item xs={2}>
            <CardContent>
              <InputLabel id="away-team-bet">away team</InputLabel>
              <Select
                labelId="away-team-bet"
                value={away.goals}
                onChange={handleAwayChange}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent>
              <TextField
                id="username"
                label="Name"
                value={name}
                onChange={handleNameChange}
              />
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClick}>
                Bet
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Match;
