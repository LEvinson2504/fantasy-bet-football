import React, { Component } from "react";

import { Match, Matches, Nav } from "./components";
import styles from "./App.module.css";

import { getUpcomingMatch } from "./api";

import Firebase from "./components/Firebase/firebase";

// Get a reference to the database service
// var database = firebase.database();

export default class App extends Component {
  state = {
    match: {},
    bets: [],
    isFetching: true,
  };

  async componentDidMount() {
    const upcomingMatch = await getUpcomingMatch();
    this.setState({ match: upcomingMatch, isFetching: false });
    console.log(this.state.match);
  }

  stateHandler(obj) {
    this.setState(
      (state) => ({ bets: [...state.bets, obj] }),
      console.log(this.state)
    );
  }

  handleSubmit(e) {
    const { home, away, name } = this.state.bets[0];
    Firebase.database()
      .ref("users/" + name)
      .set({
        username: name,
        home: home,
        away: away,
      });
  }

  render() {
    if (this.state.isFetching) {
      //waits for data to be fetched
      return <h1> Please wait </h1>;
    }
    const { match } = this.state;
    return (
      <div className={styles.container}>
        {/* <Nav /> */}
        {/* need to handle bets  */}
        <Match
          match={match}
          handleBets={(obj) => this.stateHandler(obj)}
          handleSubmit={() => this.handleSubmit}
        />
        {/* <Matches /> <br /> */}
      </div>
    );
  }
}
