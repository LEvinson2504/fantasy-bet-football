import React, { useEffect } from "react";

import styles from "./LeaderBoard.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// need to work it out here
const LeaderBoard = ({ users }) => {
  // let username = await getData();

  // handle new user point initialisation
  users.map((user) => {
    if (user.points === undefined) {
      user.points = 0;
    }
  });

  // sort users in leaderboard
  users.sort((a, b) => b.points - a.points);
  // console.log(`leaderboard : ${users}`);

  users[0].isTop = true;
  return (
    <TableContainer component={Paper}>
      <h1> Leaderboard </h1>
      <Table size="small" aria-label="a dense table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Previous bet</TableCell>
            <TableCell align="right">Match</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="user">
                {user.isTop && (
                  <span role="img" aria-label="crown emoji">
                    👑{" "}
                  </span>
                )}
                {user.name}
              </TableCell>
              <TableCell align="right">{user.points}</TableCell>
              <TableCell align="right">
                {user.homeGoals} - {user.awayGoals}
              </TableCell>
              <TableCell align="right">
                {user.homeName.name} v {user.awayName.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // {users.map((user) => (
    //   <h1 className={styles.names} key={user.name}>
    //     {user.points === 2 && (
    //       <span role="img" aria-label="crown emoji">
    //         👑{" "}
    //       </span>
    //     )}
    //     {user.name} - {user.points}pts bets {user.home}-{user.away}
    //   </h1>
    // ))}
  );
};

export default LeaderBoard;
