const players = [1, 2];  // Continue to use 1 for X and 2 for O.
let currentIndex = 0;
let gameActive = true;
let timer, countdownTimer;

const start = document.querySelector(".start");
const play = document.querySelector(".btn1");
const rules = document.querySelector(".btn2");
const container = document.querySelector(".game-container");
const retour = document.querySelector('.retour');
const rulesText = document.querySelector(".rules");
const retour2 = document.querySelector('.retour2');
const currentPlayerDisplay = document.querySelector('.current-player');
const timerDisplay = document.querySelector('.timer');

function getNextPlayer() {
    currentIndex = 1 - currentIndex;
    const player = players[currentIndex];
    updatePlayerDisplay(player);
    resetTimer();
    return player;
}

const squares = document.querySelectorAll(".cell");

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.textContent === '' && gameActive) {
            const player = getNextPlayer();
            square.textContent = player === 1 ? "X" : "O";
            checkWin();
        }
    });
});

let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (let condition of win) {
        const [a, b, c] = condition;
        if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[a].textContent === squares[c].textContent) {
            highlightWinningCells([a, b, c]);
            stopTimer();
            gameActive = false;
            return;
        }
    }

    const isDraw = Array.from(squares).every(square => square.textContent !== '');
    if (isDraw) {
        alert("Draw");
        stopTimer();
        gameActive = false;
        return;
    }
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        squares[index].classList.add('winning-cell');
    });
}

function resetGame() {
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('winning-cell');
    });
    gameActive = true;
    currentIndex = 0;
}

document.getElementById('resetButton').addEventListener('click', resetGame);

play.addEventListener('click', () => {
    container.style.display = "block";
    start.style.display = "none";
    resetGame();
    resetTimer(); // Start the timer only when play is clicked
});

retour.addEventListener('click', () => {
    container.style.display = "none";
    start.style.display = "block";
    stopTimer(); // Stops the timer when returning to start
});

rules.addEventListener('click', () => {
    start.style.display = "none";
    rulesText.style.display = "block";
});

retour2.addEventListener('click', () => {
    rulesText.style.display = "none";
    start.style.display = "block";
});

function updatePlayerDisplay(player) {
    currentPlayerDisplay.textContent = `Au tour du joueur ${player === 1 ? 'O' : 'X'}`;
}

function resetTimer() {
    if (timer) clearTimeout(timer);
    if (countdownTimer) clearInterval(countdownTimer);
    
    timer = setTimeout(() => {
        alert("Temps écoulé! Changement de joueur.");
        getNextPlayer();
    }, 30000);
    
    let countdown = 30;
    timerDisplay.textContent = countdown;
    countdownTimer = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);
}

function stopTimer() {
    clearTimeout(timer);
    clearInterval(countdownTimer);
}

updatePlayerDisplay(players[currentIndex]);  // Initialize player display
