const Player = (token) => {
    const getToken = () => token;
    return {getToken};
}


const Game = (playerOne, playerTwo) => {
    var currentPlayer = playerOne.getToken();
    var switchPlayer = true; // true if playerOne's turn, false if playerTwo's turn

    const allCells = document.querySelectorAll(".cell");
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener('click', () => {
            switchPlayer ? (currentPlayer = playerOne.getToken()) : 
                (currentPlayer = playerTwo.getToken()); // determine which player's turn it is to get token
            switchPlayer ? (switchPlayer = false) : (switchPlayer = true); // switches player turn 
            allCells[i].innerHTML = currentPlayer; // display current player's token upon cell click
        })
    }
}


// testing
const dan = Player('X');
const sam = Player('O');
const startGame = Game(dan, sam);