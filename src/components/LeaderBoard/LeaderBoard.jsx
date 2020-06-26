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
  console.log(`leaderboard : ${users}`);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Previous bet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="user">
                {user.points === 2 && (
                  <span role="img" aria-label="crown emoji">
                    👑{" "}
                  </span>
                )}
                {user.name}
              </TableCell>
              <TableCell align="right">{user.points}</TableCell>
              <TableCell align="right">
                {user.home} - {user.away}
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
