const resultDisplayer = function (resultText) {
  let $resultDiv = $("<div>", { class: "result" });
  $resultDiv.text(resultText);
  $resultDiv.appendTo($("body"));
};

const currentPlayerSetter = function () {
  $(".turn").text(`Player ${game.weapon}`);
};

const scoresDisplayer = function () {
  $(".score-tracker").text(
    `Player X wins: ${game.scoreTracker.X}, Player O wins: ${game.scoreTracker.O}, Draws: ${game.scoreTracker.Draws}`
  );
};

$(document).ready(function () {
  currentPlayerSetter(); // setting the inital current player
  $("[data-id]").click(function (event) {
    if (game.active) {
      let cellSelected = $(event.target);
      let boardIndex = cellSelected.attr("data-id");
      if (cellSelected.text() === "") {
        cellSelected.text(game.weapon);
        game.board[boardIndex] = cellSelected.text();
        if (game.winChecker()) {
          resultDisplayer(`The winner is Player ${game.winner}`);
          game.scoreTracker[game.winner]++; // incrementing the games won for the winning player
          scoresDisplayer();
          game.active = false;
        }
        if (game.turn === 9) {
          if (!game.winChecker()) {
            resultDisplayer(`The game is a draw`);
            game.scoreTracker.Draws++; // incrementing the games drawn
            scoresDisplayer();
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
    $(".result").text(""); // clearing the previous result
    game.resetBoard(); // calling the resetBoard method of the game object
    currentPlayerSetter(); // setting the current player for the next game
    game.active = true; // resetting game.active to true for the next game
  });
});
