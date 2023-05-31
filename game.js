const gameContainer = document.querySelector(".game-container");
const gameBoxes = document.querySelectorAll(".game-box");

const gameBoard = (() => {
    "use strict";
    const board = ["","","","","","","","",""];

    const boxContent = (index, player) => {
        board[index] = player;
    };

    const resetBoard = () => {
        board = ["","","","","","","","",""];
    }

    return {board, boxContent, resetBoard};
})();

const playerFactory = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;
    return { name, symbol };
};

const gameFlow = (() => {

    const assignPlayers = () => {
        const first = playerFactory("Player One", "X");
        const second = playerFactory("Player Two", "O");

        return {first, second};
    };

    const turnRules = () => {
        let turn = 0;
        let currentPlayer = assignPlayers().first;

/*        const checkWinner = (i) => {
            console.log(gameBoard.board[i]);
            console.log(gameBoard.board[i+1]);
            if(gameBoard.board[i] === gameBoard.board[i+1] && gameBoard.board[i] === gameBoard.board[i+2]){
                console.log("Hello");
            }
        };*/

        for(let gameBox of gameBoxes){
            gameBox.addEventListener("click", () => {
                if(turn%2 === 1){
                    currentPlayer = assignPlayers().second;
                } else {
                    currentPlayer = assignPlayers().first;
                }
                if(gameBoard.board[gameBox.id] === ""){
                    turn++;
                    gameBoard.boxContent(gameBox.id, currentPlayer);
                    gameBox.textContent = gameBoard.board[gameBox.id].symbol;
                }
            })
        }
    }

    const optionA = document.getElementById("option-a");
    optionA.addEventListener("click", () => {

    });

    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        startButton.textContent = "Restart";
        assignPlayers();
        turnRules();
    });
})();