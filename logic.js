// TODO: Cell collision/occupied, More start game options, AI, CSS

const Player = (token) => {
    const getToken = () => token;
    let playerMoveset = [];
    return {getToken, playerMoveset};
}

const Game = (playerOne, playerTwo) => {
    let currentPlayer;
    let switchPlayer = true; // true if playerOne's turn, false if playerTwo's turn

    const winConditions = [
        [0, 1, 2], // horizontal rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // vertical columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6]
    ];

    const determinePlayer = () => {
        switchPlayer ? (currentPlayer = playerOne) : 
            (currentPlayer = playerTwo); // determine which player's turn it is to get token
        switchPlayer ? (switchPlayer = false) : (switchPlayer = true); // switches player turn
        return currentPlayer; 
    }

    // look into refactoring with javascript array library methods
    // checks to see if the player's moveset includes a win condition
    // counter resets to 0 if a win condition is not met to check through all win conditions
    const checkWin = player => {
        for (let i = 0; i < winConditions.length; i++) {
            let counter = 0;
            for (let j = 0; j < winConditions[i].length; j++) {
                if (player.playerMoveset.includes(winConditions[i][j])) {
                    counter += 1;
                    if (counter == 3) {
                        let winDisplay = document.createElement("p");
                        winDisplay.innerHTML = `${player.getToken()} won the game!`;
                        document.body.appendChild(winDisplay);
                    }
                }
            }
        }
    }

    const allCells = document.querySelectorAll(".cell");
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener('click', () => {
            allCells[i].innerHTML = determinePlayer().getToken(); // display current player's token upon cell click
            currentPlayer.playerMoveset.push(parseInt(allCells[i].id));
            checkWin(currentPlayer);
        })
    }
}

/*
const startGame = () => {
    document.querySelector('#start').addEventListener('click', () => {
        var first = prompt("Does the first player want to be 'X' or 'O'?");
        var second = prompt("Does the first player want to be 'X' or 'O'?");
        var firstPlayer = Player(first);
        var secondPlayer = Player(second);
        Game(firstPlayer, secondPlayer);
    })
}*/

const restartGame = () => {
    document.querySelector('#restart').addEventListener('click', () => window.location.reload());
}

//startGame();
restartGame();

// testing
const dan = Player('X');
const sam = Player('O');
const startGame = Game(dan, sam);