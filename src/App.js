import React, { Component } from "react";

import { Match, Matches, Nav, LeaderBoard } from "./components";
import styles from "./App.module.css";

import { getUpcomingMatches, getMatchDetails } from "./api";

import db from "./firebase";
const firebase = require("firebase");
require("firebase/firestore");
export default class App extends Component {
  state = {
    matches: {},
    bets: [],
    users: "",
    isFetching: true,
  };

  async componentDidMount() {
    const upcomingMatches = await getUpcomingMatches();
    const users = await this.getLeaderboard();
    // for the matches stored check: 
    // console.log("match:", match);
    this.setState({ matches: upcomingMatches, isFetching: false, users: users });
    // console.log(this.state.match);
  }

  checkWinners() {
    // check matches in database
    getMatchDetails(64)
      .then(match => {
        // if a match has status finished, get the result
        if (match.status === "FINISHED") {
          console.log(match.score.fullTime.homeTeam);
          console.log(match);
          const trueHomeScore = match.score.fullTime.homeTeam;
          const trueAwayScore = match.score.fullTime.awayTeam;
          // compare the fetched result with every user
          db.collection("users").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              const userHome = doc.data().bets[0].home.goals;
              const userAway = doc.data().bets[0].away.goals;
              if ((trueHomeScore === userHome) && (trueAwayScore === userAway)) {
                // update score
                db.collection("users")
                  .doc(doc.data().username)
                  .update({
                    points: firebase.firestore.FieldValue.increment(1)
                  })
              }
              // console.log(`doc data : ${doc.data().username} - ${doc.data().bets[0].home}`);

            })
          })
        }
      })
    // console.log(getMatchDetails(64));
    // if a match has status scheduled do nothing



    // if the result is same point + 1

    // else do nothing
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

    // store matches
    db.collection("matches")
      .doc("upcoming")
      .update(this.state.matches)
      .then(doc => console.log(`match updated- ${doc}`))
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
    let users = [];
    await db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(`doc data : ${doc.data().username} - ${doc.data().bets[0].home}`);
        users.push({
          "name": doc.data().username,
          "points": doc.data().points,
          "homeName": doc.data().bets[0].home.name,
          "homeGoals": doc.data().bets[0].home.goals,
          "awayName": doc.data().bets[0].away.name,
          "awayGoals": doc.data().bets[0].away.goals,
        });
      })
    })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return users;
  }

  handleSubmit() {
    //delete this function?
    console.log(this.state.users);
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
        <LeaderBoard users={this.state.users} />
        {/* <h1> <span role="img">👑 </span>Leader: {this.state.leader} - 2pts</h1> */}
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
      </div>
    );
  }
}
