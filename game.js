const gameContainer = document.querySelector(".game-container");
const gameBoxes = document.querySelectorAll(".game-box");

const gameBoard = (() => {
    "use strict";
    let board = [0,1,2,3,4,5,6,7,8];

    const boxContent = (index, player) => {
        board[index] = player;
    };

    const resetBoard = () => {
        board = [0,1,2,3,4,5,6,7,8];
    }

    return {board, boxContent, resetBoard};
})();

const playerFactory = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;
    return { name, symbol };
};

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const checkWinner = arr => {
    winningCombos.forEach(combo => {
        if(arr[combo[0]].symbol && arr[combo[0]].symbol === arr[combo[1]].symbol && arr[combo[1]].symbol === arr[combo[2]].symbol){
            console.log(`Winner is ${arr[combo[0]].name}`);
        }
    })
}

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
                if(typeof gameBoard.board[gameBox.id] === "number"){
                    turn++;
                    gameBoard.boxContent(gameBox.id, currentPlayer);
                    gameBox.textContent = gameBoard.board[gameBox.id].symbol;
                    checkWinner(gameBoard.board);
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


