const gameContainer = document.querySelector(".game-container");

const gameBoard = (() => {
    const board = ["","","","","","","","",""];

    const boxContent = (index, symbol) => {
        board[index] = symbol;
    };

    const gameBoxes = document.querySelectorAll(".game-box");

    let turn;

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
    
});

function Player(name, symbol){
    this.name = name;
    this.symbol = symbol
};

const gameFlow = (() => {
    const playerList = [];

    const optionA = document.getElementById("option-a");
    optionA.addEventListener("click", () => {
        const first = new Player("Player One", "X");
        const second = new Player("Player Two", "O");
        playerList.push(first, second);
    });

    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {



        gameBoard();
    })
})();