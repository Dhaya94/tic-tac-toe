# **_Tic-Tac-Toe_**

Welcome to my Tic-Tac-Toe game!

#### You can play it [here](https://dhaya94.github.io/tic-tac-toe/)

## **Overview**

This project uses a combination of HTML, CSS and Javascript. The game logic was handled purely by Vanilla JS, the DOM manipulation was implemented using **jQuery**.

## **Approach**

The **game Object** consists of various properties to handle all the in-game and post-game state variables, and various methods to check the winner, swap the turns, and making the turn for the AI.

The user can play the game in the versus mode or against the AI.
There is a score tracker which keeps records of the match results untill refreshed.

## **Game Modes**

Currently there are two modes:

1. VERSUS mode - where humans play against each other
2. EASY mode - Automatic filling of the empty grid positions selected randomly
3. HARD mode - The computer move is chosen based on the result of the minimax function to ensure the game is either won or tied

## **To Do**

- Manage display of results more seamlessly, currently it is slightly jerky
- Customise tokens instead of X and Os

## **Reflections**

This was a simple game built for Project 0 at SEIR-52 GA,
I enjoyed putting together this project, making the HTML, CSS and JS working together to manage the different UI states was gratifying.

Refactoring the code to make it as "DRY" as possible was a tricky but fun process.

The most challenging piece was working on the **HARD** mode using the Minimax algo. Decoding how the recursive functions worked during each function call was a tremendous learning experience.
