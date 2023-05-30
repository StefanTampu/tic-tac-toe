const gameContainer = document.querySelector(".game-container");
const gameBoxes = document.querySelectorAll(".game-box");

const gameBoard = () => {
    const board = ["","","","","","","","",""];

    const boxContent = (index, symbol) => {
        board[index] = symbol;
    };

    const resetBoard = () => {
        board = ["","","","","","","","",""];
    }

    const getBoard = () => {
        return board;
    }

    return { boxContent, resetBoard, getBoard };

    for(let gameBox of gameBoxes){
        gameBox.addEventListener("click", () => {
            boxContent(gameBox.id, "X");
            console.log(board);
            gameBox.textContent = board[gameBox.id];
            if(turn===true){
                turn = false;
            } else {
                turn = true;
            }
            console.log(turn);
        })
    }
    
};

const playerFactory = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;
    const getName = () => {
        return name
    };
    const getSymbol = () => {
        return symbol
    };
    return { getName, getSymbol };
};

const gameFlow = (() => {
    const playerList = [];

    const assignPlayers = (() => {
        const first = playerFactory("Player One", "X");
        const second = playerFactory("Player Two", "O");

        let turn = 0;
        let currentPlayer;
        for(let gameBox of gameBoxes){
            gameBox.addEventListener("click", () => {
                if(turn%2 === 1){
                    currentPlayer = second;
                } else {
                    currentPlayer = first;
                }
                gameBox.textContent = currentPlayer.getSymbol();
                turn++;
            })
        }

        return currentPlayer;
    });

    const optionA = document.getElementById("option-a");
    optionA.addEventListener("click", () => {
        assignPlayers();
    });

    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        startButton.textContent = "Restart";
    });
})();