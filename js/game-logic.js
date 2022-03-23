const game = {
  active: true,
  board: ["", "", "", "", "", "", "", "", ""], // storing the inital game board in an array of blank characters of length 9
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
  resetBoard: function () {
    this.board.fill(""); //  filling the game board arr with blank characters
    this.turn = 1; // setting the game turn back to 1 for the new game
    this.weapon = "X"; // setting the inital weapon to "X" again
  },
};
