import React, { Component } from "react";

import { Match, Matches, Nav } from "./components";
import styles from "./App.module.css";

import { getUpcomingMatches } from "./api";

import db from "./firebase";

export default class App extends Component {
  state = {
    matches: {},
    bets: [],
    isFetching: true,
  };

  async componentDidMount() {
    const upcomingMatches = await getUpcomingMatches();
    this.setState({ matches: upcomingMatches, isFetching: false });
    // console.log(this.state.match);
  }

  storeInFirebase() {
    console.log(this.state.bets);
    const { name } = this.state;
    // const { id, home, away } = this.state.bets[0];
    // firebase
    //   .database()
    //   .ref("users/" + name)
    //   .set({
    //     username: name,
    //     home: home,
    //     away: away,
    //   });

    // using firestore
    db.collection("users")
      .doc(name)
      .update({
        username: name,
        bets: this.state.bets,
      })
      .then((doc) => console.log("added", doc.id))
      .catch((err) => console.log(err));
    // this.setState({ bets: [] });
  }

  stateHandler({ name, id, home, away }) {
    this.setState(
      (state) => ({ name: name, bets: [...state.bets, { id, home, away }] }),
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
    const { matches } = this.state;
    return (
      <div className={styles.container}>
        {/* <Nav /> */}
        {/* need to handle bets  */}
        <Matches
          matches={matches}
          handleBets={(obj) => this.stateHandler(obj)}
          handleSubmit={() => this.handleSubmit()}
        />
        {/* <Match
          match={match}
          handleBets={(obj) => this.stateHandler(obj)}
          handleSubmit={() => this.handleSubmit()}
        /> */}
        {/* <Matches /> <br /> */}
      </div>
    );
  }
}
