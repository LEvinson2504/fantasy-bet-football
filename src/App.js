import React, { Component } from "react";

import { Match, Matches, Nav, LeaderBoard } from "./components";
import styles from "./App.module.css";

import { getUpcomingMatches } from "./api";

import db from "./firebase";

export default class App extends Component {
  state = {
    matches: {},
    bets: [],
    leader: "",
    isFetching: true,
  };

  async componentDidMount() {
    const upcomingMatches = await getUpcomingMatches();
    const leader = await this.getLeaderboard()
    console.log(leader);
    this.setState({ matches: upcomingMatches, isFetching: false, leader: leader });
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
        points: 2,
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

  async getLeaderboard() {
    // let usernamePromise = await db.collection("users").doc("glynel").get().data();
    // console.log("doc data: ", usernamePromise.username);
    let username = "";
    await db.collection("users").doc("glynel").get().then(function (doc) {
      if (doc.exists) {
        username = doc.data().username
        console.log("Document data:", username);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    return username;
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
      <div>
        <h1> <span role="img"> 👑 </span>Leader: {this.state.leader} - 2pts</h1>
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
        {/* <LeaderBoard getData={() => this.getLeaderboard()} /> */}
      </div>
    );
  }
}
