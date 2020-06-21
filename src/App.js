import React, { Component } from "react";

import { Match, Matches, Nav } from "./components";
import styles from "./App.module.css";

import { getUpcomingMatch } from "./api";

import firebase from "./firebase";

export default class App extends Component {
  state = {
    match: {},
    bets: [],
    isFetching: true,
  };

  async componentDidMount() {
    const upcomingMatch = await getUpcomingMatch();
    this.setState({ match: upcomingMatch, isFetching: false });
    // console.log(this.state.match);
  }

  storeInFirebase() {
    const { name, home, away } = this.state.bets[0];
    firebase
      .database()
      .ref("users/" + name)
      .set({
        username: name,
        home: home,
        away: away,
      });
    this.setState({ bets: [] });
  }

  stateHandler(obj) {
    this.setState(
      (state) => ({ bets: [...state.bets, obj] }),
      () => this.storeInFirebase()
    );
  }

  handleSubmit() {
    console.log(this.state.bets);
    // const { home, away, name } = this.state.bets[0];

    // firebase.child("bets").push(this.state.bets, (err) => console.log(err));

    // firebase
    //   .database()
    //   .ref("users/" + name)
    //   .set({
    //     username: name,
    //     home: home,
    //     away: away,
    //   });
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
          handleSubmit={() => this.handleSubmit()}
        />
        {/* <Matches /> <br /> */}
      </div>
    );
  }
}
