const optionButtons = document.querySelectorAll(".option-button")
const optionA = document.getElementById("option-a");
const optionB = document.getElementById("option-b");
const startButton = document.querySelector(".start-button");
const mainContainer = document.querySelector(".main-container");
const gameContainer = document.querySelector(".game-container");
const gameBoxes = document.querySelectorAll(".game-box");

const gameBoard = (() => {
    "use strict";
    let board = [0,1,2,3,4,5,6,7,8];

    const boxContent = (index, player) => {
        board[index] = player;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = i;
        }
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
        const first = playerFactory("Player 1", "X");
        const second = playerFactory("Player 2", "O");

        return {first, second};
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
    
    let gameStarted = false;
    let turn = 0;
    let winner;
    let gameWon = false;
    let gameTie = false;

    const gameResult = document.createElement("h2");
    gameResult.classList.add("game-result");

    const checkWinner = () => {
        let arr = gameBoard.board;
        winningCombos.forEach(combo => {
            if(arr[combo[0]].symbol && arr[combo[0]].symbol === arr[combo[1]].symbol && arr[combo[1]].symbol === arr[combo[2]].symbol){
                winner = arr[combo[0]].name;
                gameWon = true;

                gameResult.textContent = `${arr[combo[0]].name} won the game!`;
                mainContainer.insertBefore(gameResult, gameContainer);

                startButton.classList.remove("sbtn-original");
                startButton.classList.add("sbtn-restart");
            }
        })
    };

    const checkTie = () => {
        let arr = gameBoard.board;
        const filled = element => element.symbol === "X" || element.symbol === "O";
        if (gameWon === false && arr.every(filled) === true){
            gameTie = true;
            gameResult.textContent = `It's a tie!`;
            mainContainer.insertBefore(gameResult, gameContainer);
            startButton.classList.remove("sbtn-original");
            startButton.classList.add("sbtn-restart");
        }
    }

    const turnRules = () => {
        let currentPlayer = assignPlayers().first;

        for(let gameBox of gameBoxes){
            gameBox.addEventListener("click", () => {
                if(turn%2 === 1){
                    currentPlayer = assignPlayers().second;
                } else {
                    currentPlayer = assignPlayers().first;
                }
                if(typeof gameBoard.board[gameBox.id] === "number" && gameWon === false && gameTie === false){
                    turn++;
                    gameBoard.boxContent(gameBox.id, currentPlayer);
                    gameBox.textContent = gameBoard.board[gameBox.id].symbol;
                    checkWinner();
                    checkTie();
                    if (gameStarted === false){
                        gameStarted = true;
                        startButton.textContent = "Restart";
                    }
                }
            })
        }
    }

    const gameStartStop = () => {
        startButton.addEventListener("click", () => {
            if (gameStarted === false){
                gameStarted = true;
                startButton.textContent = "Restart";
                turnRules();
            } else {
                gameStarted = false;
                startButton.textContent = "Start";
                gameBoard.resetBoard();
                gameBoxes.forEach(gameBox => {
                    gameBox.textContent = "";
                })
                turn = 0;
                winner = undefined;
                gameWon = false;
                gameTie = false;
                gameResult.textContent = "";
                startButton.classList.add("sbtn-original");
                startButton.classList.remove("sbtn-restart");
            }
        }); 
    };


    return {assignPlayers, turnRules, gameStartStop}
})();


for(let optionButton of optionButtons){
    optionButton.addEventListener("click", gameFlow.gameStartStop); 
}

