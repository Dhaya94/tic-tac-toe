const game = {
  active: true,
  board: ["", "", "", "", "", "", "", "", ""], // storing the inital game board in an array of blank characters of length 9
  mode: "",
  weapon: "X",
  winner: "",
  turn: 1,
  winConditions: [
    // nested array to store the index which need to be same to win the game
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  scoreTracker: { X: 0, O: 0, Draw: 0 },
  weaponSetter: function () {
    if (this.turn % 2 === 0) {
      this.weapon = "O";
    } else {
      this.weapon = "X";
    }
  },
  winChecker: function () {
    let gameWon = false;
    for (let i = 0; i < this.winConditions.length; i++) {
      const winCondition = this.winConditions[i];
      let choice1 = this.board[winCondition[0]];
      let choice2 = this.board[winCondition[1]];
      let choice3 = this.board[winCondition[2]];

      if (choice1 === choice2 && choice1 === choice3 && choice1 !== "") {
        gameWon = true;
        if (choice1 === "X") {
          this.winner = "X";
        } else {
          this.winner = "O";
        }
      }
    }
    return gameWon;
  },
  indexesOfElementArr: function (board, character) {
    // return array of all the indexes which is same as the passed character
    let resultArr = [];
    for (let i = 0; i < board.length; i++) {
      const el = board[i];
      if (el === character) {
        resultArr.push(i);
      }
    }
    return resultArr;
  },
  easyModeMove: function () {
    while (this.active && this.turn < 9 && this.mode === "easy") {
      let easyModeIndex = Math.floor(Math.random() * 9);
      let emptySpots = this.indexesOfElementArr(this.board, "");
      if (emptySpots.includes(easyModeIndex)) {
        this.turn++;
        this.weaponSetter();
        this.board[easyModeIndex] = this.weapon; // updating game.board arr with computer turn
        return easyModeIndex;
      }
    }
  },
  hardModeMove: function () {
    while (this.active && this.turn < 9 && this.mode === "hard") {
      let humanPlayer = "X";
      let aiPlayer = "O";

      let winCheck = function (board, player) {
        // Helper win check function to be used by the minimax function
        for (let i = 0; i < game.winConditions.length; i++) {
          const winCondition = game.winConditions[i];
          let choice1 = board[winCondition[0]];
          let choice2 = board[winCondition[1]];
          let choice3 = board[winCondition[2]];

          if (
            choice1 === choice2 &&
            choice1 === choice3 &&
            choice1 === player
          ) {
            return true;
          }
        }
        return false;
      };

      let minimax = function (newBoard, player) {
        let emptySpots = game.indexesOfElementArr(newBoard, "");
        if (winCheck(newBoard, aiPlayer)) {
          // checking for terminal states in the game i.e win, tie or lose and returning a score
          return { score: 10 };
        } else if (winCheck(newBoard, humanPlayer)) {
          return { score: -10 };
        } else if (emptySpots.length === 0) {
          return { score: 0 };
        }
        let moves = [];
        for (let i = 0; i < emptySpots.length; i++) {
          let move = {}; // an object is created for each empty spot to record the game data for with the spot
          move.index = emptySpots[i]; // index key is created to store the index of each empty spot
          move.el = newBoard[emptySpots[i]]; // el key is created to store the element in the index in the original board of the function call
          newBoard[emptySpots[i]] = player; // placing the player turn in the newBoard to simulate and record results

          if (player === aiPlayer) {
            // the minimax function is recursively being called untill a terminal state is detected
            let result = minimax(newBoard, humanPlayer); // calling the minimax function with the other player to conitnue the simulation of the game
            move.score = result.score; // storing the score based on terminal state check
          } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
          }
          newBoard[emptySpots[i]] = move.el; // resetting the board to the original state as of the start of the function call
          moves.push(move); // pushing each move object into moves array
        }

        let bestMove;
        if (player === aiPlayer) {
          // returning the best move for each function call if terminal state is reached
          let bestScore = -100; // for aiPlayer bestscore is set to a negative number so it will be assigned to a positve score when it is found
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        } else {
          let bestScore = 100; // for humanPlayer bestscore is set to a postive number so it will be assigned to a negative score when it is found
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }
        return moves[bestMove]; // The whole move object where index === bestMove is returned
      };

      let hardModeIndex = minimax(this.board, aiPlayer).index; // assigning the hardmodeIndex to value stored in the index key of the move object which minimax returned
      this.turn++;
      this.weaponSetter();
      this.board[hardModeIndex] = this.weapon; // updating game.board arr with computer turn
      return hardModeIndex;
    }
  },
  clearBoard: function () {
    this.board.fill(""); //  filling the game board arr with blank characters
    this.turn = 1; // setting the game turn back to 1 for the new game
    this.weapon = "X"; // setting the inital weapon to "X" again
  },
};
