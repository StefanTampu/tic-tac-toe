const gameContainer = document.querySelector(".game-container");

const gameBoard = (() => {
    const board = ["","","","","","","","",""];

    const boxContent = (index, symbol) => {
        board[index] = symbol;
    };

    const gameBoxes = document.querySelectorAll(".game-box");

    for(let gameBox of gameBoxes){
        gameBox.addEventListener("click", () => {
            boxContent(gameBox.id, "X");
            console.log(board);
            gameBox.textContent = board[gameBox.id];
        })
    }
    
})();

function Player(name, symbol){
    this.name = name;
    this.symbol = symbol
};

const gameFlow = (() => {
    const optionA = document.getElementById("option-a");
    optionA.addEventListner("click", )
})