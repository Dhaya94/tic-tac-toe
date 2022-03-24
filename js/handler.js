const currentPlayerSetter = function () {
  // display which player is playing the current turn
  $(".turn").text(`Player ${game.weapon}`);
};

const modeChecker = function () {
  // check if a mode has been selected
  if (!game.mode) {
    $(".choose-mode").removeClass("hidden");
  } else {
    $(".choose-mode").addClass("hidden");
    return true;
  }
};

const modeSetter = function (className) {
  // set a mode based on the mode-button selected
  $(".mode-btn").removeClass("selected-btn");
  const clickedElementClasses = $(className).attr("class").split(" ");
  const clickedElementText = $(className).text().toLowerCase();
  if (clickedElementClasses.includes(clickedElementText)) {
    game.mode = clickedElementText;
  }
  $(className).addClass("selected-btn");
  $(".choose-mode").addClass("hidden");
};

const resultDisplayer = function (resultText) {
  let $resultDiv = $("<div>", { class: "result" });
  $resultDiv.text(resultText);
  $resultDiv.appendTo($(".main"));
};

const scoresUpdater = function (result) {
  resultClass = ".score-" + result.toLowerCase(); // set resultClass to the class name pointing to the display of current game's result
  $(resultClass).text(`${game.scoreTracker[result]}`);
};

const winStateUpdater = function () {
  game.scoreTracker[game.winner]++; // incrementing the games won for the winning player
  resultDisplayer(`The winner is Player ${game.winner}`);
  scoresUpdater(game.winner); // passing the value of winner as a  string to the scoreUpdater function
  game.active = false;
};

const drawStateUpdater = function () {
  if (!game.winChecker()) {
    game.scoreTracker.Draw++; // incrementing the games drawn
    resultDisplayer(`The game is a draw`);
    scoresUpdater("Draw"); // passing "Draw" as a string to the scoreUpdater function
    game.active = false;
  }
};

const reMatchFunc = function () {
  $("[data-id]").text(""); // clearing the game board
  $(".result").remove(); // removing the result div
  game.resetBoard(); // calling the resetBoard method of the game object
  currentPlayerSetter(); // setting the current player for the next game
  game.active = true; // resetting game.active to true for the next game
};

$(document).ready(function () {
  currentPlayerSetter(); // setting the inital current player

  $(".versus").click(function () {
    modeSetter(".versus");
  });

  $(".easy").click(function () {
    modeSetter(".easy");
  });

  $(".hard").click(function () {
    modeSetter(".hard");
  });

  $("[data-id]").click(function (event) {
    if (modeChecker() && game.active) {
      let cellSelected = $(event.target);
      let boardIndex = cellSelected.attr("data-id");

      if (cellSelected.text() === "") {
        // checking if the selected grid is empty
        cellSelected.text(game.weapon);
        game.board[boardIndex] = cellSelected.text(); // updating game.board arr with "X" or "O" based on player turn

        if (game.winChecker()) {
          // checking if the game is won after each player turn
          winStateUpdater();
        } else {
          // play ai turn
          let nextIndex = game.easyModeMove();
          $(`[data-id=${nextIndex}]`).text(game.weapon);
          if (game.winChecker()) {
            // checking if the game is won after each player turn
            winStateUpdater(); // Update the winning result
          }
        }

        if (game.turn === 9) {
          // checking if turn has reached 9 to set the result as display
          if (!game.winChecker()) {
            drawStateUpdater();
          }
        }

        game.turn++;
        game.weaponSetter(); // swapping the X and O
        currentPlayerSetter(); // chaging the current player
      }
    }
  });

  $(".rematch").click(function () {
    reMatchFunc();
  });
});
