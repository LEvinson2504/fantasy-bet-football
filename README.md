# Fantasy Bet Football

## Front-End

### TODO

1. Make user login / registration form.
   - username
   - email id
   - password
   - favourite club

## Back-End

### TODO

1. Automate Leaderboard and move it to back end
   - need to fetch results of completed matches from api
   - check the match ids with user bets match ids
     - if (match.id == user.match.id) {
       if (match.score == user.score){
       user.points++;
       }
       user.match.remove();
       }
