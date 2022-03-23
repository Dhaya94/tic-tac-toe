const currentPlayerSetter = function () {
  $(".turn").text(`Player ${game.weapon}`);
};

const resultDisplayer = function (resultText) {
  let $resultDiv = $("<div>", { class: "result" });
  $resultDiv.text(resultText);
  $resultDiv.appendTo($("body"));
};

const scoresUpdater = function (result) {
  resultClass = ".score-" + result.toLowerCase(); // set resultClass to the class name pointing to the display of current game's result
  $(resultClass).text(`${game.scoreTracker[result]}`);
};

$(document).ready(function () {
  currentPlayerSetter(); // setting the inital current player
  $("[data-id]").click(function (event) {
    if (game.active) {
      let cellSelected = $(event.target);
      let boardIndex = cellSelected.attr("data-id");

      if (cellSelected.text() === "") {
        // checking if the selected grid is empty
        cellSelected.text(game.weapon);
        game.board[boardIndex] = cellSelected.text(); // updating game.board arr with "X" or "O" based on player turn

        if (game.winChecker()) {
          // checking if the game is won each turn
          game.scoreTracker[game.winner]++; // incrementing the games won for the winning player
          resultDisplayer(`The winner is Player ${game.winner}`);
          scoresUpdater(game.winner); // passing the value of winner as a  string to the scoreUpdater function
          game.active = false;
        }

        if (game.turn === 9) {
          // checking if turn has reached 9 to set the result as display
          if (!game.winChecker()) {
            game.scoreTracker.Draw++; // incrementing the games drawn
            resultDisplayer(`The game is a draw`);
            scoresUpdater("Draw"); // passing "Draw" as a string to the scoreUpdater function
            game.active = false;
          }
        }

        game.turn++;
        game.weaponSetter();
        currentPlayerSetter(); // chaging the current player
      }
    }
  });

  $(".reset-btn").click(function () {
    $("[data-id]").text(""); // clearing the game board
    $(".result").remove(); // removing the result div
    game.resetBoard(); // calling the resetBoard method of the game object
    currentPlayerSetter(); // setting the current player for the next game
    game.active = true; // resetting game.active to true for the next game
  });
});
